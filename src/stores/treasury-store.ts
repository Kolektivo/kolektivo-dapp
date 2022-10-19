import { Asset } from 'models/asset';
import { BigNumber } from '@ethersproject/bignumber';
import { BigNumberOverTimeData, ValueChartData } from 'models/chart-data';
import { DI, IContainer, Registration } from 'aurelia';
import { IContractService, IServices } from 'services';
import { IContractStore } from './contract-store';
import { IDataStore } from './data-store';
import { Interval } from 'models/interval';
import { MonetaryContractAbi } from 'services/contract/types';
import { Transaction } from 'models/transaction';
import { Treasury } from 'models/generated/monetary/treasury/Treasury';
import { callOnce } from './../decorators/call-once';
import { convertIntervalToRecordType, fromWei, getTimeMinusInterval } from 'utils';

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
    @IServices private readonly services: IServices,
    @IContractStore private readonly contractStore: IContractStore,
    @IContractService private readonly contractService: IContractService,
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
    const contract = this.getTreasuryContract();
    this.totalValuation = await contract?.totalValuation();
    this.totalSupply = await contract?.totalSupply();
    this.treasuryDistribution = (await this.getDistributionPercentage('Treasury')).toNumber() / 100;
    this.reservesDistribution = (await this.getDistributionPercentage('Reserve')).toNumber() / 100;
  }

  @callOnce()
  public async loadAssets(): Promise<void> {
    const contract = this.getTreasuryContract();
    if (!contract) return;
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
      await Promise.all(
        addresses.map(
          (address): Promise<Asset | undefined> =>
            this.contractStore.getAsset(address.address, address.tokenId, contract, treasuryAddress, this.transactions).catch(),
        ),
      )
    ).filter(Boolean);
  }

  public async getValueOverTime(interval: Interval): Promise<ValueChartData[]> {
    //get data from datastore
    const earliestTime = getTimeMinusInterval(interval);
    const kttOverTimeData = await this.dataStore.getDocs<BigNumberOverTimeData[]>(
      `chartData/ktt/${convertIntervalToRecordType(interval)}`,
      'createdAt',
      'desc',
      { fieldPath: 'createdAt', opStr: '>=', value: earliestTime },
    );
    //map data from datastore to what the UI needs
    const chartData = kttOverTimeData.map((x) => {
      return {
        createdAt: new Date(x.createdAt),
        value: this.services.numberService.fromString(fromWei(x.value, 18)),
      } as unknown as ValueChartData;
    });
    //sort data by date ascending
    chartData.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    //get latest data from the contract for last data point
    const contract = this.getTreasuryContract();
    const totalValuation = await contract?.totalValuation();
    //add last data point
    chartData.push({
      createdAt: new Date(),
      value: this.services.numberService.fromString(fromWei(totalValuation ?? BigNumber.from(0), 18)),
    } as unknown as ValueChartData);
    return chartData;
  }

  public async getLastRebaseTime() {
    const contract = this.getTreasuryContract();
    if (!contract) return;
    const rebaseEvents = await contract.queryFilter(contract.filters.Rebase());
    rebaseEvents.sort((a, b) => {
      return b.blockNumber - a.blockNumber;
    });
    this.lastRebaseTime = new Date((await rebaseEvents[0].getBlock()).timestamp * 1000);
  }

  public get circulatingDistribution(): number {
    if (this.treasuryDistribution == null || this.reservesDistribution == null) return 0;
    return 1 - (this.treasuryDistribution + this.reservesDistribution);
  }

  public get currentPrice(): BigNumber {
    if (!this.totalSupply || !this.totalValuation) return BigNumber.from(0);
    return this.totalSupply.div(this.totalValuation);
  }

  public getTreasuryContract(): Treasury | null {
    if (this.treasuryContract) return this.treasuryContract;
    this.treasuryContract = this.contractService.getContract('Monetary', 'Treasury');
    return this.treasuryContract;
  }

  private async getDistributionPercentage(contractName: MonetaryContractAbi): Promise<BigNumber> {
    const address = this.contractService.getContract('Monetary', contractName).address;
    if (!address || !this.totalSupply) return BigNumber.from(0);
    const tokens = await this.getTreasuryContract()?.balanceOf(address);
    return tokens?.div(this.totalSupply) ?? BigNumber.from(0);
  }
}
