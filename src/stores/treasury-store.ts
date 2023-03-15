import { DI, IContainer, Registration } from 'aurelia';

import { IConfiguration } from '../configurations/configuration';
import { Asset } from '../models/asset';
import { BigNumberOverTimeData, ValueChartData } from '../models/chart-data';
import { Interval } from '../models/interval';
import { Treasury } from '../pages';
import { IContractService, INumberService } from '../services';
import { MonetaryContractAbi } from '../services/contract';
import { convertIntervalToRecordType, fromWei, getTimeMinusInterval } from '../utils';

import { callOnce } from './../decorators/call-once';
import { IContractStore } from './contract-store';
import { IDataStore } from './data-store';
import { Transaction } from './kolektivo-store';

import { BigNumber } from '@ethersproject/bignumber';

export type ITreasuryStore = TreasuryStore;
export const ITreasuryStore = DI.createInterface<ITreasuryStore>('TreasuryStore');

export class TreasuryStore {
  public totalSupply?: BigNumber;
  public totalValuation?: BigNumber;
  public treasuryDistribution?: number;
  public reservesDistribution?: number;
  private treasuryContract?: Treasury;
  public lastRebaseTime?: Date;
  public treasuryAssets?: (Asset | undefined)[] = [];
  public transactions: Transaction[] = [];
  constructor(
    @INumberService private readonly numberService: INumberService,
    @IContractStore private readonly contractStore: IContractStore,
    @IContractService private readonly contractService: IContractService,
    @IConfiguration private readonly configuration: IConfiguration,
    @IDataStore private readonly dataStore: IDataStore,
  ) {}

  public static register(container: IContainer): void {
    container.register(Registration.singleton(ITreasuryStore, TreasuryStore));
  }
  public get treasuryValue(): number {
    if (this.treasuryAssets?.length === 0) return 0;
    return this.treasuryAssets?.map((x) => x?.total ?? 0).sum() ?? 0;
  }
  public async loadTokenData(): Promise<void> {
    if (this.totalValuation && this.totalSupply) return;
    const contract = await this.getTreasuryContract();
    this.totalValuation = await contract.totalValuation();
    this.totalSupply = await contract.totalSupply();
    this.treasuryDistribution = (await this.getDistributionPercentage('Treasury')).toNumber();
    this.reservesDistribution = (await this.getDistributionPercentage('Reserve')).toNumber();
  }

  @callOnce()
  public async loadAssets(): Promise<void> {
    const contract = await this.getTreasuryContract();
    const treasuryAddress = contract.address;
    if (!treasuryAddress) return;

    //get all token addresses from the contract
    const addresses = (
      await Promise.all([
        contract.allRegisteredERC20s().then((x) => x.map((y) => ({ tokenId: undefined, address: y } as { tokenId?: BigNumber; address: string }))),
        contract.allRegisteredERC721Ids().then((x) => x.map((y) => ({ tokenId: y.id, address: y.erc721 }))),
      ])
    ).flatMap((x) => x);

    //get all token asset data
    this.treasuryAssets = (
      await Promise.all(addresses.map((address): Promise<Asset | undefined> => this.contractStore.getAsset(address.address, address.tokenId, contract, treasuryAddress, this.transactions).catch()))
    ).filter(Boolean);
  }

  public async getValueOverTime(interval: Interval): Promise<ValueChartData[]> {
    //get data from datastore
    const earliestTime = getTimeMinusInterval(interval);
    const kttOverTimeData = await this.dataStore.getDocs<BigNumberOverTimeData[]>(`${this.configuration.firebaseCollection}/ktt/${convertIntervalToRecordType(interval)}`, 'createdAt', 'desc', {
      fieldPath: 'createdAt',
      opStr: '>=',
      value: earliestTime,
    });
    //map data from datastore to what the UI needs
    const chartData = kttOverTimeData.map((x) => {
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
    const contract = await this.getTreasuryContract();
    const totalValuation = await contract.totalValuation();
    //add last data point
    chartData.push({
      createdAt: new Date(),
      value: this.numberService.fromString(fromWei(totalValuation, 18)),
    } as unknown as ValueChartData);
    return chartData;
  }

  public async getLastRebaseTime() {
    const contract = await this.getTreasuryContract();
    const rebaseEvents = await contract.queryFilter(contract.filters.Rebase());
    rebaseEvents.sort((a, b) => {
      return b.blockNumber - a.blockNumber;
    });
    this.lastRebaseTime = rebaseEvents[0] && new Date((await rebaseEvents[0].getBlock()).timestamp * 1000);
  }

  public get circulatingDistribution(): number {
    if (this.treasuryDistribution == null || this.reservesDistribution == null) return 0;
    return 1 - (this.treasuryDistribution + this.reservesDistribution);
  }

  public get currentPrice(): number | string {
    if (!this.totalSupply || !this.totalValuation) return 0;
    return Number(fromWei(this.totalSupply, 18)) / Number(fromWei(this.totalValuation, 18));
  }

  public async getTreasuryContract(): Promise<Treasury> {
    if (this.treasuryContract) return this.treasuryContract;
    this.treasuryContract = await this.contractService.getContract('monetary', 'Treasury');
    return this.treasuryContract;
  }

  private async getDistributionPercentage(contractName: MonetaryContractAbi): Promise<BigNumber> {
    const address = (await this.contractService.getContract('monetary', contractName)).address;
    if (!address || !this.totalSupply) return BigNumber.from(0);
    const tokens = await (await this.getTreasuryContract()).balanceOf(address);
    return tokens.div(this.totalSupply);
  }
}
