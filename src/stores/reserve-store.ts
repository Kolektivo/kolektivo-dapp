import { Asset } from 'models/asset';
import { BigNumber } from '@ethersproject/bignumber';
import { DI, IContainer, Registration } from 'aurelia';
import { IContractService, fromWei } from 'services';
import { IContractStore } from './contract-store';
import { Reserve } from 'models/generated/monetary/reserve/Reserve';
import { Transaction } from 'models/transaction';
import { callOnce } from 'decorators/call-once';

export type IReserveStore = ReserveStore;
export const IReserveStore = DI.createInterface<IReserveStore>('ReserveStore');

export class ReserveStore {
  public reserveValuation?: BigNumber;
  public supplyValuation?: BigNumber;
  public backing?: BigNumber;
  public kCurPrice?: number;
  public kCurSupply?: BigNumber;
  public transactions: Transaction[] = [];
  public reserveAssets?: (Asset | undefined)[] = [];
  public kCurReserveDistribution?: number;
  public kCurMentoDistribution?: number;
  public kCurPrimaryPoolDistribution?: number;

  private reserveContract?: Reserve;

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IReserveStore, ReserveStore));
  }
  constructor(@IContractStore private readonly contractStore: IContractStore, @IContractService private readonly contractService: IContractService) {}

  public get reserveValue(): number {
    if (this.reserveAssets?.length === 0) return 0;
    return this.reserveAssets?.map((x) => x?.total ?? 0).sum() ?? 0;
  }

  public get kCurCirculatingDistribution(): number {
    if (!this.kCurReserveDistribution || !this.kCurMentoDistribution || !this.kCurPrimaryPoolDistribution) return 0;
    return 1 - (this.kCurReserveDistribution + this.kCurMentoDistribution + this.kCurPrimaryPoolDistribution);
  }

  @callOnce()
  public async loadAssets(): Promise<void> {
    const contract = this.getReserveContract();
    if (!contract) return;
    const reserveAddress = contract.address;
    if (!reserveAddress) return;
    //get all token addresses from the contract
    const addresses = (
      await Promise.all([
        contract.allRegisteredERC20s().then((x) => x.map((y) => ({ tokenId: undefined, address: y } as { tokenId?: BigNumber; address: string }))),
        contract.allRegisteredERC721Ids().then((x) => x.map((y) => ({ tokenId: y.id, address: y.erc721 }))),
      ])
    ).flatMap((x) => x);
    //get all token asset data
    this.reserveAssets = await Promise.all(
      addresses.map(
        (address): Promise<Asset | undefined> =>
          this.contractStore.getAsset(address.address, address.tokenId, contract, reserveAddress, this.transactions).catch(),
      ),
    );
    const reserveStatus = await contract.reserveStatus();
    this.reserveValuation = reserveStatus[0];
    this.supplyValuation = reserveStatus[1];
    this.backing = reserveStatus[2];
  }

  @callOnce()
  public async loadkCur(): Promise<void> {
    const contract = this.getReserveContract(); // get reserve contract
    if (!contract) return;
    const kCurAddress = await contract.token(); // get kCur token address
    if (!kCurAddress) return;
    const reserveAddress = this.contractService.getContract('Monetary', 'Reserve').address;
    if (!reserveAddress) return;
    const oracleAddress = await contract.tokenOracle(); //get kCur oracle address
    if (!oracleAddress) return;
    const asset = await this.contractStore.getAsset(kCurAddress, undefined, contract, reserveAddress, undefined, oracleAddress);
    this.kCurPrice = asset?.token.price;
    this.kCurSupply = asset?.totalSupply;

    //TODO: Get the balances of kCur inside of the reserve, mento and the primary pool and set those values here
    this.kCurReserveDistribution = 0.2;
    this.kCurMentoDistribution = 0.3;
    this.kCurPrimaryPoolDistribution = 0.4;
  }

  public get marketCap(): number {
    if (!this.kCurPrice || !this.kCurSupply || this.kCurSupply.eq(0)) return 0;
    return Number(fromWei(this.kCurSupply, 18)) * this.kCurPrice;
  }

  private getReserveContract(): Reserve | null {
    if (this.reserveContract) return this.reserveContract;
    this.reserveContract = this.contractService.getContract('Monetary', 'Reserve') as Reserve;
    return this.reserveContract;
  }
}
