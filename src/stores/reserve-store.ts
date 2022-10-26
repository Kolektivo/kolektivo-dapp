import { Asset } from 'models/asset';
import { BigNumber } from '@ethersproject/bignumber';
import { BigNumberOverTimeData, NumberOverTimeData, ValueChartData } from 'models/chart-data';
import { DI, IContainer, Registration } from 'aurelia';
import { Erc20 } from 'models/generated/monetary/erc20';
import { IContractService, INumberService, fromWei } from 'services';
import { IContractStore } from './contract-store';
import { IDataStore } from './data-store';
import { Interval } from 'models/interval';
import { Reserve } from './../models/generated/monetary/reserve/Reserve';
import { Transaction } from 'models/transaction';
import { callOnce } from 'decorators/call-once';
import { convertIntervalToRecordType, getTimeMinusInterval } from 'utils';

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

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IReserveStore, ReserveStore));
  }
  constructor(
    @IContractStore private readonly contractStore: IContractStore,
    @IContractService private readonly contractService: IContractService,
    @INumberService private readonly numberService: INumberService,
    @IDataStore private readonly dataStore: IDataStore,
  ) {}

  public get reserveValue(): number {
    if (this.reserveAssets?.length === 0) return 0;
    return this.reserveAssets?.map((x) => x?.total ?? 0).sum() ?? 0;
  }

  public get kCurCirculatingDistribution(): number {
    if (!this.kCurReserveDistribution || !this.kCurMentoDistribution || !this.kCurPrimaryPoolDistribution) return 0;
    return 1 - (this.kCurReserveDistribution + this.kCurMentoDistribution + this.kCurPrimaryPoolDistribution);
  }

  public get leverageRatio(): number {
    return this.numberService.fromString(fromWei(this.backing ?? 0, 2));
  }

  @callOnce()
  public async loadAssets(): Promise<void> {
    const contract = this.getReserveContract();
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
    await this.loadkCurData();
    const contract = this.getReserveContract(); // get reserve contract
    if (!this.kCurSupply) return; //can't get the distribution percentages without a total supply value so return if it's not there
    //TODO: Get the balances of kCur inside of the reserve, mento and the primary pool and set those values here
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const kCurContract: Erc20 = this.contractService.getContract('Monetary', 'Kolektivo Curacao Token'); // get the kCur contract
    const kCurInReserve = await kCurContract.balanceOf(contract.address); //get the balace of kCur in the reserve
    this.kCurReserveDistribution =
      this.numberService.fromString(fromWei(kCurInReserve, 18)) / this.numberService.fromString(fromWei(this.kCurSupply, 18));
    this.kCurMentoDistribution = 0.3;
    this.kCurPrimaryPoolDistribution = 0.4;
  }

  private async loadkCurData(): Promise<void> {
    const contract = this.getReserveContract(); // get reserve contract
    const kCurAddress = await contract.token(); // get kCur token address
    if (!kCurAddress) return;
    const reserveAddress: string = contract.address;
    if (!reserveAddress) return;
    const oracleAddress = await contract.tokenOracle(); //get kCur oracle address
    if (!oracleAddress) return;
    const asset = await this.contractStore.getAsset(kCurAddress, undefined, contract, reserveAddress, undefined, oracleAddress);
    this.kCurPrice = asset?.token.price;
    this.kCurSupply = asset?.totalSupply;
  }

  public getReserveContract(): Reserve {
    return this.contractService.getContract('Monetary', 'Reserve');
  }

  public async getReserveValueOverTime(interval: Interval): Promise<ValueChartData[]> {
    //get data from datastore
    const earliestTime = getTimeMinusInterval(interval);
    const valueOverTimeData = await this.dataStore.getDocs<BigNumberOverTimeData[]>(
      `chartData/reserve/${convertIntervalToRecordType(interval)}`,
      'createdAt',
      'desc',
      { fieldPath: 'createdAt', opStr: '>=', value: earliestTime },
    );
    //map data from datastore to what the UI needs
    const chartData = valueOverTimeData.map((x) => {
      return {
        createdAt: new Date(x.createdAt),
        value: this.numberService.fromString(fromWei(x.value, 18)),
      } as unknown as ValueChartData;
    });
    //sort data by date ascending
    chartData.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    //get latest data from the contract for last data point
    const contract = this.getReserveContract();
    const reserveStatus = await contract.reserveStatus();
    //add last data point
    chartData.push({
      createdAt: new Date(),
      value: this.numberService.fromString(fromWei(reserveStatus[0], 18)),
    } as unknown as ValueChartData);
    return chartData;
  }

  public async getLeverageRatioValueOverTime(interval: Interval): Promise<ValueChartData[]> {
    //get data from datastore
    const earliestTime = getTimeMinusInterval(interval);
    const valueOverTimeData = await this.dataStore.getDocs<BigNumberOverTimeData[]>(
      `chartData/kCurRatio/${convertIntervalToRecordType(interval)}`,
      'createdAt',
      'desc',
      { fieldPath: 'createdAt', opStr: '>=', value: earliestTime },
    );
    //map data from datastore to what the UI needs
    const chartData = valueOverTimeData.map((x) => {
      return {
        createdAt: new Date(x.createdAt),
        value: x.value,
      } as unknown as ValueChartData;
    });
    //sort data by date ascending
    chartData.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    //get latest data from the contract for last data point
    const contract = this.getReserveContract();
    const reserveStatus = await contract.reserveStatus();
    //add last data point
    chartData.push({
      createdAt: new Date(),
      value: this.numberService.fromString(fromWei(reserveStatus[2], 2)),
    } as unknown as ValueChartData);
    return chartData;
  }

  public async getkCurPriceOverTime(interval: Interval): Promise<ValueChartData[]> {
    //get data from datastore
    const earliestTime = getTimeMinusInterval(interval);
    const valueOverTimeData = await this.dataStore.getDocs<NumberOverTimeData[]>(
      `chartData/kCurPrice/${convertIntervalToRecordType(interval)}`,
      'createdAt',
      'desc',
      { fieldPath: 'createdAt', opStr: '>=', value: earliestTime },
    );
    //map data from datastore to what the UI needs
    const chartData = valueOverTimeData.map((x) => {
      return {
        createdAt: new Date(x.createdAt),
        value: x.value,
      } as unknown as ValueChartData;
    });
    //sort data by date ascending
    chartData.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    //get latest data from the contract for last data point
    await this.loadkCurData();
    //add last data point
    chartData.push({
      createdAt: new Date(),
      value: this.kCurPrice,
    } as unknown as ValueChartData);
    return chartData;
  }
}
