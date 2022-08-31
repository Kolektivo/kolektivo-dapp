import { Asset } from 'models/asset';
import { BigNumber } from '@ethersproject/bignumber';
import { ContractNames } from '../services/contracts-service';
import { DI, IContainer, ILogger, Registration } from 'aurelia';
import { Erc20, TransferEvent } from 'models/generated/erc20/Erc20';
import { IServices, ITokenInfo, fromWei } from 'services';
import { Oracle } from 'models/generated/oracle/Oracle';
import { Transaction } from 'models/transaction';
import { Treasury } from '.dethcrypto/eth-sdk-client/esm/types/alfajores/Treasury';
import { callOnce } from './../decorators/call-once';

export type ITreasuryStore = TreasuryStore;
export const ITreasuryStore = DI.createInterface<ITreasuryStore>('TreasuryStore');

export class TreasuryStore {
  public totalSupply?: BigNumber;
  public totalValuation?: BigNumber;
  public treasuryDistribution?: number;
  public reservesDistribution?: number;
  private treasuryContract?: Treasury;
  public treasuryAssets: Asset[] = [];
  public transactions: Transaction[] = [];
  constructor(@IServices private readonly services: IServices, @ILogger private readonly logger: ILogger) {}

  public static register(container: IContainer): void {
    container.register(Registration.singleton(ITreasuryStore, TreasuryStore));
  }
  public get treasuryValue(): number {
    if (this.treasuryAssets.length === 0) return 0;
    return this.treasuryAssets.map((x) => x.total).sum();
  }
  public async loadTokenData(): Promise<void> {
    if (this.totalValuation && this.totalSupply) return;
    const contract = this.getTreasuryContract();
    this.totalValuation = await contract?.totalValuation();
    this.totalSupply = await contract?.totalSupply();
    this.treasuryDistribution = (await this.getDistributionPercentage(ContractNames.TREASURY)).toNumber() / 100;
    this.reservesDistribution = (await this.getDistributionPercentage(ContractNames.RESERVE)).toNumber() / 100;
  }

  @callOnce()
  public async loadAssets(): Promise<void> {
    const contract = this.getTreasuryContract();
    if (!contract) return;
    const treasuryAddress = this.services.contractsService.getContractAddress(ContractNames.TREASURY) ?? '';
    if (!treasuryAddress) return;

    //TODO: figure out the size of the array from the contract so we can do it async all
    //const arraySize = await this.contractService.getArraySize(treasuryAddress);
    //console.log('Array Size', BigNumber.from(arraySize).toNumber());

    let i = 0;
    while (i != -1) {
      try {
        const asset = await this.getTreasuryAsset(contract, treasuryAddress, i);
        if (asset) {
          this.treasuryAssets.push(asset);
        }
        i++;
      } catch (ex) {
        i = -1;
      }
    }
  }

  private async getTreasuryAsset(contract: Treasury, treasuryAddress: string, i: number): Promise<Asset | undefined> {
    const assetAddress = await contract.registeredAssets(BigNumber.from(i));
    if (!assetAddress) return;
    const oracleAddress = await contract.oraclePerAsset(assetAddress); // get the oracle address for the given asset
    if (!oracleAddress) return;
    const oracleContract = this.services.contractsService.getContractAtAddress<Oracle>(ContractNames.ORACLE, oracleAddress); //get the oracle contract for the given oracle address
    const data = await oracleContract.getData(); // get the data from the oracle contract
    if (!data[1]) return; // if the oracleContract.getData() returns false don't use this token's data (according to Marvin G.)
    const tokenInfo = await this.services.tokenService.getTokenInfoFromAddress(assetAddress); //get the token info from the asset address
    if (!tokenInfo) {
      this.logger.error(`No token info was found for ${assetAddress}`);
      return;
    }
    tokenInfo.price = this.services.numberService.fromString(fromWei(data[0], 18)) ?? 0; //price comes back as undefined from getTokenInfoFromAddress so set it
    let tokenQuantity = BigNumber.from(1); //all NFTs have a quantity of 1, so set the quantity to 1 initially
    const tokenContract = this.services.tokenService.getTokenContract<Erc20>(assetAddress, tokenInfo.id); //get the ERC20 contract from the asset's address
    if (!tokenInfo.id) {
      //if there is no id on the token, then it's not an NFT and we have to get more information about it
      tokenQuantity = await tokenContract.balanceOf(treasuryAddress); // find the amount of these tokens in the treasury
    }
    void this.populateTransactionsForAsset(tokenContract, treasuryAddress, tokenInfo); //while we are looping through the token contracts, populate the transactions on the treasury for the token contract

    const asset: Asset = {
      quantity: tokenInfo.id ? BigNumber.from(1) : tokenQuantity,
      token: tokenInfo,
      total: 0,
    };
    asset.total = this.services.numberService.fromString(fromWei(asset.quantity.mul(asset.token.price ?? 0), 18)) ?? 0;
    return asset;
  }

  private async populateTransactionsForAsset(tokenContract: Erc20, treasuryAddress: string, tokenInfo: ITokenInfo) {
    //get all the deposits to the treasury for the given token
    const deposits = await tokenContract.queryFilter(tokenContract.filters.Transfer(undefined, treasuryAddress));
    const mappedDeposits = await this.mapTransactions(deposits, 'deposit', tokenInfo);
    this.transactions.push(...mappedDeposits);
    //get all the withdrawls from the treasury for the given token
    const withdrawls = await tokenContract.queryFilter(tokenContract.filters.Transfer(treasuryAddress));
    const mappedWithdrawls = await this.mapTransactions(withdrawls, 'withdrawl', tokenInfo);
    this.transactions.push(...mappedWithdrawls);
    //console.log('Mapped Transactions', this.transactions);
  }

  private async mapTransactions(transactions: TransferEvent[], type: 'deposit' | 'withdrawl', tokenInfo: ITokenInfo): Promise<Transaction[]> {
    return await Promise.all(
      transactions.map(async (transaction): Promise<Transaction> => {
        const block = await transaction.getBlock();
        return {
          address: type === 'deposit' ? transaction.args.from : transaction.args.to,
          amount: transaction.args.amount,
          date: block.timestamp,
          id: transaction.transactionHash,
          token: tokenInfo,
          type: type,
        } as Transaction;
      }),
    );
  }

  public get circulatingDistribution(): number {
    if (this.treasuryDistribution == null || this.reservesDistribution == null) return 0;
    return 1 - (this.treasuryDistribution + this.reservesDistribution);
  }

  public get currentPrice(): BigNumber {
    if (!this.totalSupply || !this.totalValuation) return BigNumber.from(0);
    return this.totalSupply.div(this.totalValuation);
  }

  private async getDistributionPercentage(contractName: string): Promise<BigNumber> {
    const address = this.services.contractsService.getContractAddress(contractName);
    if (!address || !this.totalSupply) return BigNumber.from(0);
    const tokens = await this.getTreasuryContract()?.balanceOf(address);
    return tokens?.div(this.totalSupply) ?? BigNumber.from(0);
  }

  private getTreasuryContract(): Treasury | null {
    if (this.treasuryContract) return this.treasuryContract;
    const treasuryAddress = this.services.contractsService.getContractAddress(ContractNames.TREASURY);
    if (treasuryAddress) {
      this.treasuryContract = this.services.contractsService.getContractAtAddress<Treasury>(
        ContractNames.TREASURY,
        treasuryAddress,
        this.services.contractsService.createProvider(),
      );
      return this.treasuryContract;
    }
    return null;
  }
}
