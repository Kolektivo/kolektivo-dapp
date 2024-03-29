import { DI, IContainer, Registration } from 'aurelia';

import { IConfiguration } from '../configurations/configuration';
import { callOnce } from '../decorators/call-once';
import { Asset, AssetType } from '../models/asset';
import { BigNumberOverTimeData, kCurPriceData, kCurSupplyData, LeverageChartData, RiskChartData, ValueChartData } from '../models/chart-data';
import { Erc20 } from '../models/generated/monetary/erc20';
import { Exchange } from '../models/generated/monetary/exchange';
import { Kolektivoguilder } from '../models/generated/monetary/kolektivoguilder/Kolektivoguilder';
import { Mentoreserve } from '../models/generated/monetary/mentoreserve';
import { Interval } from '../models/interval';
import { PrimaryPoolData, PrimaryPoolDataTokens } from '../models/primary-pool';
import { Transaction } from '../models/transaction';
import { IContractService, INumberService, ISymmetricService } from '../services';
import { convertIntervalToRecordType, fromWei, getTimeMinusInterval } from '../utils';

import { Proxypool } from './../models/generated/monetary/proxypool/Proxypool';
import { Reserve } from './../models/generated/monetary/reserve/Reserve';
import { IContractStore } from './contract-store';
import { IDataStore } from './data-store';

import { BigNumber } from '@ethersproject/bignumber';

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
  public kCurPriceFloor?: number;
  public kCurPriceCeiling?: number;
  public minBacking?: BigNumber;
  public kGuilderCurrentPrice?: number;
  public kGuilderTotalSupply?: BigNumber;
  public kGuilderSpread?: number;
  public kGuilderInflationRate?: number;
  public kGuilderTobinTax?: number;
  public kGuilderPriceParity?: number;
  public kGuilderValueRatio?: number;
  public primaryPoolData?: PrimaryPoolData[];

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IReserveStore, ReserveStore));
  }
  constructor(
    @IContractStore private readonly contractStore: IContractStore,
    @IContractService private readonly contractService: IContractService,
    @INumberService private readonly numberService: INumberService,
    @ISymmetricService private readonly symmetricService: ISymmetricService,
    @IConfiguration private readonly configuration: IConfiguration,
    @IDataStore private readonly dataStore: IDataStore,
  ) {}

  public get kCurCirculatingDistribution(): number {
    return 1 - ((this.kCurReserveDistribution ?? 0) + (this.kCurMentoDistribution ?? 0) + (this.kCurPrimaryPoolDistribution ?? 0));
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
      await Promise.all(addresses.map((address): Promise<Asset | undefined> => this.contractStore.getAsset(address.address, address.tokenId, contract, reserveAddress, this.transactions).catch()))
    ).filter(Boolean) as Asset[];
    this.reserveAssets = await Promise.all(
      this.reserveAssets.map(async (x) => {
        return { ...x, type: await contract.riskLevelOfERC20(x.token.address) };
      }),
    );
    void this.loadkCurData();
    const reserveStatus = await contract.reserveStatus();
    this.reserveValue = reserveStatus[0];
    this.kCurMarketCap = reserveStatus[1];
    this.backing = reserveStatus[2];
    this.minBacking = await contract.minBacking();
  }

  @callOnce()
  public async loadkCur(): Promise<void> {
    await this.loadAssets();
    await this.loadkCurData();
    if (!this.kCurSupply) return; //can't get the distribution percentages without a total supply value so return if it's not there
    const kCurSupply = this.numberService.fromString(fromWei(this.kCurSupply, 18));
    //console.log(kCurSupply); //print kCurSupply
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const kCurContract: Erc20 = await this.contractService.getContract('monetary', 'CuracaoReserveToken'); // get the kCur contract
    const multiSigContract: Erc20 = await this.contractService.getContract('monetary', 'KolektivoMultiSig'); // get the kCur contract
    const kCurInReserve = await kCurContract.balanceOf(multiSigContract.address); //get the balace of kCur in the reserve
    this.kCurReserveDistribution = this.numberService.fromString(fromWei(kCurInReserve, 18)) / kCurSupply;
    const proxyPool: Proxypool = await this.contractService.getContract('monetary', 'ProxyPool'); // get the kCur contract
    const priceCeilingMultiplier = this.numberService.fromString(fromWei(await proxyPool.ceilingMultiplier(), 4));
    //console.log('kCur Price Floor', this.kCurPriceFloor);
    const contract = await this.getReserveContract();
    const reserveStatus = await contract.reserveStatus();
    const reserveValue = reserveStatus[0];
    const kCurPriceFloor = this.numberService.fromString(fromWei(reserveValue, 18)) / this.numberService.fromString(fromWei(this.kCurSupply, 18));
    this.kCurPriceFloor = kCurPriceFloor;
    this.kCurPriceCeiling = kCurPriceFloor * priceCeilingMultiplier;

    //console.log('kCur Price Ceiling', this.kCurPriceCeiling);
    const mentoReserveContract: Erc20 = await this.contractService.getContract('monetary', 'MentoReserve'); // get the kCur contract
    const mentoInReserve = await kCurContract.balanceOf(mentoReserveContract.address);
    this.kCurMentoDistribution = this.numberService.fromString(fromWei(mentoInReserve, 18)) / kCurSupply;
    this.kCurPrimaryPoolDistribution = 0;
  }

  @callOnce()
  public async loadkGuilder(): Promise<void> {
    await this.loadkCurData();
    this.kGuilderCurrentPrice = 0.558; //supposed to be hard coded for now per Marvin/Luuk
    const contract = await this.getReserveContract();
    const reserveAddress = contract.address;
    if (!reserveAddress) return;
    const kGuilderContract: Kolektivoguilder = await this.contractService.getContract('monetary', 'KolektivoGuilder'); // get the kCur contract
    //console.log('kGuilder Contract', kGuilderContract); // 0x76658A30cEc19FA312781dB3e9AB7AeAF17ecA87
    //const oracleAddress = await contract.tokenOracle();
    //console.log('kGuilder Oracle Address', oracleAddress); //0xBd2aE2b8b8dbDA718A5B00090aad783aDCa90F67
    //const oracleContract: Oracle = await this.contractService.getContract('monetary', 'Oracle', oracleAddress); //get the oracle contract for the given oracle address
    //console.log('kGuilder Oracle Contact', oracleContract);
    //const data = await oracleContract.getData(); // get the data from the oracle contract
    //console.log('DATA', data);
    const totalSupply = await kGuilderContract.totalSupply();
    //console.log('Total Supply', totalSupply);
    const mentoExchange: Exchange = await this.contractService.getContract('monetary', 'Exchange'); // get the kCur contract
    //console.log('Mento Exchange', mentoExchange);
    const spread = await mentoExchange.spread();
    //console.log('Spread', this.numberService.fromString(fromWei(spread, 20)));
    const mentoReserve: Mentoreserve = await this.contractService.getContract('monetary', 'MentoReserve'); // get the kCur contract
    const tobinTax = await mentoReserve.tobinTax();
    // console.log('Tobin Tax', tobinTax);

    const [kGSupply, kCurSupply] = await mentoExchange.getBuyAndSellBuckets(true);
    // console.log('kCUR Amount in MentoReserve', this.numberService.fromString(fromWei(kCurSupply, 18)));
    // console.log('total kG minted', this.numberService.fromString(fromWei(kGSupply, 18)));

    //Ratio is (total amount of kCUR * kCUR Price) / (total amount of kG * kgPrice)
    // console.log('total amount of kCur', this.numberService.fromString(fromWei(kCurSupply, 18)));
    // console.log('kCur price', this.kCurPrice);

    // console.log('(total amount of kCUR * kCUR Price)', (this.kCurPrice ?? 0) * this.numberService.fromString(fromWei(kCurSupply, 18)));
    // console.log('(total amount of kG * kgPrice)', this.kGuilderCurrentPrice * this.numberService.fromString(fromWei(kGSupply, 18)));

    const ratio = ((this.kCurPrice ?? 0) * this.numberService.fromString(fromWei(kCurSupply, 18))) / (this.kGuilderCurrentPrice * this.numberService.fromString(fromWei(kGSupply, 18)));
    //console.log('current ratio', ratio);

    const [inflationRate] = await kGuilderContract.getInflationParameters();
    //console.log('Inflation rate', inflationRate);
    this.kGuilderValueRatio = ratio;
    this.kGuilderTotalSupply = totalSupply;
    this.kGuilderSpread = this.numberService.fromString(fromWei(spread, 25));
    this.kGuilderInflationRate = this.numberService.fromString(fromWei(inflationRate, 25));
    this.kGuilderTobinTax = this.numberService.fromString(fromWei(tobinTax, 18));
    this.kGuilderPriceParity = 0;
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
    //console.log('set kCurPrice', asset?.token.price);
    //const oracleContract: Oracle = await this.contractService.getContract('monetary', 'Oracle', oracleAddress);
    //console.log('Set kCurPrice', await oracleContract.getData());
    this.kCurPrice = asset?.token.price;
    this.kCurSupply = asset?.totalSupply;
  }

  public getReserveContract(): Promise<Reserve> {
    return this.contractService.getContract('monetary', 'Reserve');
  }

  public async getReserveValueOverTime(interval: Interval): Promise<BigNumberOverTimeData[]> {
    const [valueOverTimeData, reserveStatus] = await Promise.all([this.getData<BigNumberOverTimeData>('reserve', interval), this.getReserveContract().then((contract) => contract.reserveStatus())]);
    valueOverTimeData.push({
      createdAt: Number(new Date()),
      value: reserveStatus[0],
    } as unknown as BigNumberOverTimeData);
    return valueOverTimeData;
  }

  public async getkGuilderValueRatioOverTime(interval: Interval): Promise<ValueChartData[]> {
    const [valueOverTimeData] = await Promise.all([this.getData<ValueChartData>('kGuilder', interval), this.loadkCurData(), this.loadkGuilder()]);
    valueOverTimeData.push({
      createdAt: Number(new Date()),
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
      createdAt: Number(new Date()),
      currentLeverageRatio: this.calculateLeverage(reserveStatus[2]),
      maxLeverageRatio: (1 / (this.numberService.fromString(fromWei(minBacking, 2)) / 100)) * 100,
    } as unknown as LeverageChartData);
    return valueOverTimeData;
  }

  public async getkCurSupplyData(interval: Interval): Promise<kCurSupplyData[]> {
    const [valueOverTimeData] = await Promise.all([this.getData<kCurSupplyData>('kCurSupply', interval), this.loadkCur()]);
    valueOverTimeData.push({
      createdAt: Number(new Date()),
      kCurCirculatingDistribution: this.kCurCirculatingDistribution,
      kCurMentoDistribution: this.kCurMentoDistribution,
      kCurPrimaryPoolDistribution: this.kCurPrimaryPoolDistribution,
      kCurReserveDistribution: this.kCurReserveDistribution,
    } as unknown as kCurSupplyData);
    return valueOverTimeData;
  }

  public async loadPrimaryPoolData(): Promise<void> {
    const poolData = await this.symmetricService.indexVolumeAndFees();
    this.primaryPoolData = [
      {
        tokens: [
          { symbol: 'kCUR', icon: 'https://assets.website-files.com/5fcaa3a6fcb269f7778d1f87/60a957ee7011916564689917_LOGO_MARK_color.svg' } as PrimaryPoolDataTokens,
          { symbol: 'cUSD', icon: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389' } as PrimaryPoolDataTokens,
        ],
        fees: Number(poolData.swapFeeParsed),
        tvl: Number(poolData.tvl),
        volume: Number(poolData.volumeParsed),
      },
    ];
  }

  public async getkCurPriceOverTime(interval: Interval): Promise<kCurPriceData[]> {
    const [valueOverTimeData] = await Promise.all([this.getData<kCurPriceData>('kCurPrice', interval), this.loadkCurData(), this.loadAssets(), this.loadkCur()]);
    //add last data point
    valueOverTimeData.push({
      createdAt: Number(new Date()),
      kCurPrice: this.kCurPrice,
      kCurPriceCeiling: this.kCurPriceCeiling,
      kCurPriceFloor: this.kCurPriceFloor,
    } as unknown as kCurPriceData);
    return valueOverTimeData;
  }

  public get lowRiskAssets(): Asset[] {
    return this.reserveAssets?.filter((x) => x.type === AssetType.Low) ?? [];
  }
  public get moderateRiskAssets(): Asset[] {
    return this.reserveAssets?.filter((x) => x.type === AssetType.Medium) ?? [];
  }
  public get highRiskAssets(): Asset[] {
    return this.reserveAssets?.filter((x) => x.type === AssetType.High) ?? [];
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
      createdAt: Number(new Date()),
      minCollateralValue: this.minCollateralizationValue,
      marketCap: (this.kCurPrice ?? 0) * this.numberService.fromString(fromWei(this.kCurSupply ?? 0, 18)),
      lowRisk: this.lowRiskAssets.map((x) => x.total).sum(),
      moderateRisk: this.moderateRiskAssets.map((x) => x.total).sum(),
      highRisk: this.highRiskAssets.map((x) => x.total).sum(),
    } as unknown as RiskChartData);
    return valueOverTimeData;
  }

  private async getData<T extends { createdAt: Date }>(collection: string, interval: Interval): Promise<T[]> {
    //get data from datastore
    const earliestTime = getTimeMinusInterval(interval);
    const data = await this.dataStore.getDocs<T[]>(`${this.configuration.firebaseCollection}/${collection}/${convertIntervalToRecordType(interval)}`, 'createdAt', 'desc', {
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
