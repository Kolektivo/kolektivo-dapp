import { Asset, AssetType } from 'models/asset';
import { BigNumber } from '@ethersproject/bignumber';
import { BigNumberOverTimeData, LeverageChartData, RiskChartData, ValueChartData, kCurPriceData, kCurSupplyData } from 'models/chart-data';
import { DI, IContainer, Registration } from 'aurelia';
import { Erc20 } from 'models/generated/monetary/erc20';
import { IContractService, INumberService, fromWei } from 'services';
import { IContractStore } from './contract-store';
import { IDataStore } from './data-store';
import { Interval } from 'models/interval';
import { Reserve } from './../models/generated/monetary/reserve/Reserve';
import { RiskClass } from 'models/risk-class';
import { Transaction } from 'models/transaction';
import { callOnce } from 'decorators/call-once';
import { convertIntervalToRecordType, getTimeMinusInterval } from 'utils';

export type IReserveStore = ReserveStore;
export const IReserveStore = DI.createInterface<IReserveStore>('ReserveStore');

export class ReserveStore {
  public reserveValue?: BigNumber;
  public kCurMarketCap?: BigNumber;
  public backing?: BigNumber;
  public kCurPrice?: number;
  public kCurSupply?: BigNumber;
  public transactions: Transaction[] = [];
  public reserveAssets?: Asset[] = [];
  public kCurReserveDistribution?: number;
  public kCurMentoDistribution?: number;
  public kCurPrimaryPoolDistribution?: number;
  public minBacking?: BigNumber;
  public kGuilderCurrentPrice?: number;
  public kGuilderTotalSupply?: BigNumber;
  public kGuilderSpread?: number;
  public kGuilderInflationRate?: number;
  public kGuilderTobinTax?: number;

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IReserveStore, ReserveStore));
  }
  constructor(
    @IContractStore private readonly contractStore: IContractStore,
    @IContractService private readonly contractService: IContractService,
    @INumberService private readonly numberService: INumberService,
    @IDataStore private readonly dataStore: IDataStore,
  ) {}

  public get kCurCirculatingDistribution(): number {
    if (!this.kCurReserveDistribution || !this.kCurMentoDistribution || !this.kCurPrimaryPoolDistribution) return 0;
    return 1 - (this.kCurReserveDistribution + this.kCurMentoDistribution + this.kCurPrimaryPoolDistribution);
  }

  public get currentCollateralizationRatio(): number {
    return this.numberService.fromString(fromWei(this.backing ?? 0, 2));
  }

  public get currentLeverageRatio(): number {
    if (!this.backing) return 0;
    return this.calculateLeverage(this.backing);
  }

  public get maxLeverageRatio(): number {
    return (1 / this.numberService.fromString(fromWei(this.minBacking ?? 0, 4))) * 100;
  }

  public get minCollateralizationRatio(): number {
    return this.numberService.fromString(fromWei(this.minBacking ?? 0, 4));
  }

  public get minCollateralizationValue(): number {
    if (!this.kCurMarketCap) return 0;
    return this.minCollateralizationRatio * this.numberService.fromString(fromWei(this.kCurMarketCap, 18));
  }

  public get maxLeverageMultiplier(): string {
    return `${Math.round((this.maxLeverageRatio / 100) * 100) / 100}x`;
  }

  public get kCurTotalValue(): number {
    return this.numberService.fromString(fromWei(this.kCurMarketCap ?? 0, 18));
  }

  public get kGuilderMarketCap(): number {
    if (!this.kGuilderCurrentPrice) return 0;
    return this.kGuilderCurrentPrice * this.numberService.fromString(fromWei(this.kGuilderTotalSupply ?? 0, 18));
  }

  public get kCurPriceFloor(): number {
    if (!this.reserveValue || !this.kCurSupply) return 0;
    //price floor is defined in the BL as Reserve Value / kCUR Supply
    return this.numberService.fromString(fromWei(this.reserveValue, 18)) / this.numberService.fromString(fromWei(this.kCurSupply, 18));
  }

  public get kCurPriceCeiling(): number {
    if (!this.reserveValue || !this.kCurSupply) return 0;
    //price ceiling is defined in the BL as Price Floor * Ceiling Multiplier
    //TODO get ceiling multiplier from the proxy contract when we get it
    return this.kCurPriceFloor * 1.9;
  }

  public get lowRiskAssets(): Asset[] {
    return this.reserveAssets?.filter((x) => x.type === AssetType.Stablecoin) ?? [];
  }
  public get moderateRiskAssets(): Asset[] {
    return this.reserveAssets?.filter((x) => x.type === AssetType.NonStablecoin) ?? [];
  }
  public get highRiskAssets(): Asset[] {
    return this.reserveAssets?.filter((x) => x.type === AssetType.Ecological) ?? [];
  }

  public get kGuilderValueRatio(): number {
    if (!this.kCurPrice) return 0;
    //TODO get the kGuilder price and divide that by kCurPrice
    return 4 / this.kCurPrice;
  }

  public getRiskClass(assetType: AssetType): RiskClass {
    switch (assetType) {
      case AssetType.Ecological:
        return RiskClass.high;
      case AssetType.NonStablecoin:
        return RiskClass.moderate;
      case AssetType.Stablecoin:
        return RiskClass.low;
    }
  }

  @callOnce()
  public async loadAssets(): Promise<void> {
    const contract = await this.getReserveContract();
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
    this.reserveAssets = (
      await Promise.all(
        addresses.map(
          (address): Promise<Asset | undefined> =>
            this.contractStore.getAsset(address.address, address.tokenId, contract, reserveAddress, this.transactions).catch(),
        ),
      )
    ).filter(Boolean) as Asset[];
    void this.loadkCurData();
    const reserveStatus = await contract.reserveStatus();
    this.reserveValue = reserveStatus[0];
    this.kCurMarketCap = reserveStatus[1];
    this.backing = reserveStatus[2];
    this.minBacking = await contract.minBacking();
  }

  @callOnce()
  public async loadkCur(): Promise<void> {
    await this.loadkCurData();
    const contract = await this.getReserveContract(); // get reserve contract
    if (!this.kCurSupply) return; //can't get the distribution percentages without a total supply value so return if it's not there
    //TODO: Get the balances of kCur inside of the reserve, mento and the primary pool and set those values here
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const kCurContract: Erc20 = await this.contractService.getContract('monetary', 'Kolektivo Curacao Token'); // get the kCur contract
    const kCurInReserve = await kCurContract.balanceOf(contract.address); //get the balace of kCur in the reserve
    this.kCurReserveDistribution =
      this.numberService.fromString(fromWei(kCurInReserve, 18)) / this.numberService.fromString(fromWei(this.kCurSupply, 18));
    this.kCurMentoDistribution = 0.3;
    this.kCurPrimaryPoolDistribution = 0.4;
  }

  @callOnce()
  public async loadkGuilder(): Promise<void> {
    const contract = await this.getReserveContract();
    const reserveAddress = contract.address;
    if (!reserveAddress) return;
    this.kGuilderCurrentPrice = 4;
    this.kGuilderTotalSupply = BigNumber.from(1934223345231232342413213n);
    this.kGuilderSpread = 0.2;
    this.kGuilderInflationRate = 0.01;
    this.kGuilderTobinTax = 0.05;
  }

  private async loadkCurData(): Promise<void> {
    if (this.kCurPrice || this.kCurSupply) return;
    const contract = await this.getReserveContract(); // get reserve contract
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

  public getReserveContract(): Promise<Reserve> {
    return this.contractService.getContract('monetary', 'Reserve');
  }

  public async getReserveValueOverTime(interval: Interval): Promise<BigNumberOverTimeData[]> {
    const [valueOverTimeData, reserveStatus] = await Promise.all([
      this.getData<BigNumberOverTimeData>('reserve', interval),
      this.getReserveContract().then((contract) => contract.reserveStatus()),
    ]);
    valueOverTimeData.push({
      createdAt: new Date(),
      value: reserveStatus[0],
    } as unknown as BigNumberOverTimeData);
    return valueOverTimeData;
  }

  public async getkGuilderValueRatioOverTime(interval: Interval): Promise<ValueChartData[]> {
    const [valueOverTimeData] = await Promise.all([this.getData<ValueChartData>('kGuilder', interval), this.loadkCurData()]);
    valueOverTimeData.push({
      createdAt: new Date(),
      value: this.kGuilderValueRatio,
    } as unknown as ValueChartData);
    return valueOverTimeData;
  }

  public async getLeverageRatioValueOverTime(interval: Interval): Promise<LeverageChartData[]> {
    const [valueOverTimeData, [reserveStatus, minBacking]] = await Promise.all([
      this.getData<LeverageChartData>('kCurRatio', interval),
      this.getReserveContract().then((contract) => Promise.all([contract.reserveStatus(), contract.minBacking()])),
    ]);
    valueOverTimeData.push({
      createdAt: new Date(),
      currentLeverageRatio: this.calculateLeverage(reserveStatus[2]),
      maxLeverageRatio: (1 / (this.numberService.fromString(fromWei(minBacking, 2)) / 100)) * 100,
    } as unknown as LeverageChartData);
    return valueOverTimeData;
  }

  public async getkCurSupplyData(interval: Interval): Promise<kCurSupplyData[]> {
    const [valueOverTimeData] = await Promise.all([this.getData<kCurSupplyData>('kCurSupply', interval), this.loadkCur()]);
    valueOverTimeData.push({
      createdAt: new Date(),
      kCurCirculatingDistribution: this.kCurCirculatingDistribution,
      kCurMentoDistribution: this.kCurMentoDistribution,
      kCurPrimaryPoolDistribution: this.kCurPrimaryPoolDistribution,
      kCurReserveDistribution: this.kCurReserveDistribution,
    } as unknown as kCurSupplyData);
    return valueOverTimeData;
  }

  public async getkCurPriceOverTime(interval: Interval): Promise<kCurPriceData[]> {
    const [valueOverTimeData] = await Promise.all([this.getData<kCurPriceData>('kCurPrice', interval), this.loadkCurData(), this.loadAssets()]);
    //add last data point
    valueOverTimeData.push({
      createdAt: new Date(),
      kCurPrice: this.kCurPrice,
      kCurPriceCeiling: this.kCurPriceCeiling,
      kCurPriceFloor: this.kCurPriceFloor,
    } as unknown as kCurPriceData);
    return valueOverTimeData;
  }

  public async getRiskOverTime(interval: Interval): Promise<RiskChartData[]> {
    const [valueOverTimeData, [reserveStatus, minBacking]] = await Promise.all([
      this.getData<RiskChartData>('risk', interval),
      this.getReserveContract().then((contract) => Promise.all([contract.reserveStatus(), contract.minBacking()])),
      this.loadAssets(),
    ]);
    this.kCurMarketCap = reserveStatus[1];
    this.minBacking = minBacking;
    valueOverTimeData.push({
      createdAt: new Date(),
      minCollateralValue: this.minCollateralizationValue,
      marketCap: this.kCurTotalValue,
      lowRisk: this.lowRiskAssets.map((x) => x.total).sum(),
      moderateRisk: this.moderateRiskAssets.map((x) => x.total).sum(),
      highRisk: this.highRiskAssets.map((x) => x.total).sum(),
    } as unknown as RiskChartData);
    return valueOverTimeData;
  }

  private async getData<T extends { createdAt: Date }>(collection: string, interval: Interval): Promise<T[]> {
    //get data from datastore
    const earliestTime = getTimeMinusInterval(interval);
    const data = await this.dataStore.getDocs<T[]>(`chartData/${collection}/${convertIntervalToRecordType(interval)}`, 'createdAt', 'desc', {
      fieldPath: 'createdAt',
      opStr: '>=',
      value: earliestTime,
    });
    //sort data by date ascending
    data.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    return data;
  }

  private calculateLeverage(value: BigNumber): number {
    return (1 / this.numberService.fromString(fromWei(value, 4))) * 100;
  }
}
