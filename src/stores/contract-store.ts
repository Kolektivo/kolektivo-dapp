import { Asset, AssetType } from 'models/asset';
import { BigNumber } from 'ethers';
import { ContractNames, IServices, ITokenInfo, fromWei } from '../services';
import { DI, IContainer, ILogger, Registration } from 'aurelia';
import { Erc20, TransferEvent } from 'models/generated/erc20/Erc20';
import { Erc721 } from 'models/generated/erc721';
import { Oracle } from 'models/generated/oracle';
import { Reserve } from 'models/generated/reserve';
import { Transaction } from 'models/transaction';
import { Treasury } from 'models/generated/treasury';
export type IContractStore = ContractStore;
export const IContractStore = DI.createInterface<IContractStore>('IContractStore');

export class ContractStore {
  public static register(container: IContainer): void {
    container.register(Registration.singleton(IContractStore, ContractStore));
  }
  constructor(@IServices private readonly services: IServices, @ILogger private readonly logger: ILogger) {}

  public async getAsset(
    assetAddress: string,
    contract: Treasury | Reserve,
    treasuryAddress: string,
    transactions: Transaction[],
    getAssetType: (address: string) => Promise<number>,
  ): Promise<Asset | undefined> {
    const oracleAddress = await contract.oraclePerERC20(assetAddress); // get the oracle address for the given asset
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
    const tokenContract = this.services.tokenService.getTokenContract(assetAddress, tokenInfo.id); //get the ERC20 contract from the asset's address
    let assetType = AssetType.Ecological;
    if (!tokenInfo.id) {
      //this is an ERC20 token so let's find it's asset type
      assetType = await getAssetType(assetAddress);
      //if there is no id on the token, then it's not an NFT and we have to get more information about it
      tokenQuantity = await tokenContract.balanceOf(treasuryAddress); // find the amount of these tokens in the treasury
    }
    void this.populateTransactionsForAsset(transactions, tokenContract, treasuryAddress, tokenInfo); //while we are looping through the token contracts, populate the transactions on the treasury for the token contract
    const asset: Asset = {
      quantity: tokenInfo.id ? BigNumber.from(1) : tokenQuantity,
      token: tokenInfo,
      total: 0,
      type: assetType,
    };
    asset.total = (this.services.numberService.fromString(fromWei(asset.quantity, 18)) ?? 0) * tokenInfo.price;
    return asset;
  }

  private async populateTransactionsForAsset(
    transactions: Transaction[],
    tokenContract: Erc20 | Erc721,
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
}
