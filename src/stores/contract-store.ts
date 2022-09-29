import { Asset, AssetType } from 'models/asset';
import { BigNumber } from 'ethers';
import { DI, IContainer, ILogger, Registration } from 'aurelia';
import { Erc20, TransferEvent as Erc20TransferEvent } from 'models/generated/monetary/erc20/Erc20';
import { Erc721, TransferEvent as Erc721TransferEvent } from 'models/generated/monetary/erc721/Erc721';
import { IContractService, tokenInfos } from 'services/contract';
import { INumberService, ITokenInfo, fromWei, toWei } from '../services';
import { Oracle } from './../models/generated/monetary/oracle/Oracle';
import { Reserve } from 'models/generated/monetary/reserve';
import { Transaction } from 'models/transaction';
import { Treasury } from 'models/generated/monetary/treasury';
export type IContractStore = ContractStore;
export const IContractStore = DI.createInterface<IContractStore>('IContractStore');

export class ContractStore {
  public static register(container: IContainer): void {
    container.register(Registration.singleton(IContractStore, ContractStore));
  }
  constructor(
    @IContractService private readonly contractService: IContractService,
    @ILogger private readonly logger: ILogger,
    @INumberService private readonly numberService: INumberService,
  ) {}

  public async getAsset(
    assetAddress: string,
    assetId: BigNumber | undefined,
    contract: Treasury | Reserve,
    contractAddress: string,
    transactions?: Transaction[],
    oracleAddress?: string,
  ): Promise<Asset | undefined> {
    let assetIdNumber: number | null | undefined = undefined;
    if (assetId) {
      assetIdNumber = Number(assetId);
    }
    const tokenInfo = tokenInfos.find((y) => y.address === assetAddress && y.id == assetIdNumber);
    if (!tokenInfo) {
      this.logger.error(`No token info was found for ${assetAddress}`);
      return;
    }

    const tokenContract = this.contractService.getTokenContract(assetAddress, tokenInfo.id);

    if (!oracleAddress) {
      if (tokenInfo.id) {
        // if an id exists on token info, then it's an NFT or an ERC721 and needs to call a differnt method to get the oracle address for that asset
        oracleAddress = await contract.oraclePerERC721Id(assetAddress, tokenInfo.id);
      } else {
        oracleAddress = await contract.oraclePerERC20(assetAddress); // get the oracle address for the given asset
      }
    }

    if (!oracleAddress || BigNumber.from(oracleAddress).isZero()) return;
    const oracleContract: Oracle = this.contractService.getContract('Monetary', 'Oracle', oracleAddress); //get the oracle contract for the given oracle address
    const data = await oracleContract.getData(); // get the data from the oracle contract

    if (!data[1]) return; // if the oracleContract.getData() returns false don't use this token's data (according to Marvin G.)
    tokenInfo.price = this.numberService.fromString(fromWei(data[0], 18)); //price comes back as undefined from getTokenInfoFromAddress so set it

    let tokenQuantity = toWei(1, 18); //all NFTs have a quantity of 1, so set the quantity to 1 initially
    let totalSupply: BigNumber | undefined;
    if (!tokenInfo.id) {
      totalSupply = await (tokenContract as Erc20).totalSupply();
      tokenQuantity = await tokenContract.balanceOf(contractAddress); // find the amount of these tokens in the treasury
    }
    let assetType: AssetType | undefined;
    if (!tokenInfo.id) {
      //this is an ERC20 token so let's find it's asset type
      assetType = await contract.assetTypeOfERC20(assetAddress);
      //if there is no id on the token, then it's not an NFT and we have to get more information about it
    } else {
      assetType = AssetType.Ecological;
    }

    if (transactions) {
      void this.populateTransactionsForAsset(transactions, tokenContract, contractAddress, tokenInfo); //while we are looping through the token contracts, populate the transactions on the treasury for the token contract
    }
    const asset: Asset = {
      quantity: tokenQuantity,
      token: tokenInfo,
      total: 0,
      type: assetType,
      totalSupply: totalSupply,
    };
    asset.total = tokenInfo.id ? tokenInfo.price : this.numberService.fromString(fromWei(asset.quantity, 18)) * tokenInfo.price;
    return asset;
  }

  private async populateTransactionsForAsset<T extends Erc20 | Erc721>(
    transactions: Transaction[],
    tokenContract: T,
    treasuryAddress: string,
    tokenInfo: ITokenInfo,
  ): Promise<void> {
    //get all the deposits to the treasury for the given token
    const deposits = await tokenContract.queryFilter(tokenContract.filters.Transfer(undefined, treasuryAddress));
    const mappedDeposits = await this.mapTransactions(deposits, 'deposit', tokenInfo);
    transactions.push(...mappedDeposits);
    //get all the withdrawls from the treasury for the given token
    const withdrawls = await tokenContract.queryFilter(tokenContract.filters.Transfer(treasuryAddress));
    const mappedWithdrawls = await this.mapTransactions(withdrawls, 'withdrawl', tokenInfo);
    transactions.push(...mappedWithdrawls);
  }

  private async mapTransactions<T extends Erc20TransferEvent | Erc721TransferEvent>(
    transactions: T[],
    type: 'deposit' | 'withdrawl',
    tokenInfo: ITokenInfo,
  ): Promise<Transaction[]> {
    return await Promise.all(
      transactions.map(async (transaction): Promise<Transaction> => {
        const block = await transaction.getBlock();

        return {
          address: type === 'deposit' ? transaction.args.from : transaction.args.to,
          amount: 'amount' in transaction.args ? transaction.args.amount : toWei(1, 18),
          date: block.timestamp,
          id: transaction.transactionHash,
          token: tokenInfo,
          type: type,
        } as Transaction;
      }),
    );
  }
}
