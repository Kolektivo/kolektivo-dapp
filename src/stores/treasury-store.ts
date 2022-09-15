import { Asset } from 'models/asset';
import { BigNumber } from '@ethersproject/bignumber';
import { ContractNames } from '../services/contracts-service';
import { DI, IContainer, Registration } from 'aurelia';
import { IContractStore } from './contract-store';
import { IServices, fromWei } from 'services';
import { Transaction } from 'models/transaction';
import { Treasury } from 'models/generated/treasury/Treasury';
import { callOnce } from './../decorators/call-once';

export type ITreasuryStore = TreasuryStore;
export const ITreasuryStore = DI.createInterface<ITreasuryStore>('TreasuryStore');

export class TreasuryStore {
  public totalSupply?: BigNumber;
  public totalValuation?: BigNumber;
  public treasuryDistribution?: number;
  public reservesDistribution?: number;
  private treasuryContract?: Treasury;
  public treasuryAssets?: (Asset | undefined)[] = [];
  public transactions: Transaction[] = [];
  public valueOverTime?: { date: Date; value: number }[] = [];
  constructor(@IServices private readonly services: IServices, @IContractStore private readonly contractStore: IContractStore) {}

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
    this.treasuryDistribution = (await this.getDistributionPercentage(ContractNames.TREASURY)).toNumber() / 100;
    this.reservesDistribution = (await this.getDistributionPercentage(ContractNames.RESERVE)).toNumber() / 100;
  }

  @callOnce()
  public async loadAssets(): Promise<void> {
    const contract = this.getTreasuryContract();
    void this.setValueOverTime();
    if (!contract) return;
    const treasuryAddress = this.services.contractsService.getContractAddress(ContractNames.TREASURY) ?? '';
    if (!treasuryAddress) return;

    //get all token addresses from the contract
    const addresses = (
      await Promise.all([contract.allRegisteredERC20s(), contract.allRegisteredERC721Ids().then((x) => x.map((y) => y.erc721))])
    ).flatMap((x) => x);
    //get all token asset data
    this.treasuryAssets = await Promise.all(
      addresses.map(
        (address): Promise<Asset | undefined> =>
          // eslint-disable-next-line @typescript-eslint/unbound-method
          this.contractStore.getAsset(address, contract, treasuryAddress, this.transactions, contract.assetTypeOfERC20),
      ),
    );
  }

  public async setValueOverTime(): Promise<void> {
    const contract = this.getTreasuryContract();
    if (!contract) return;
    const rebaseEvents = await contract.queryFilter(contract.filters.Rebase());

    this.valueOverTime = await Promise.all(
      rebaseEvents.map(async (x) => ({
        date: new Date((await x.getBlock()).timestamp * 1000),
        value: this.services.numberService.fromString(fromWei(x.args.newScalar, 18)) ?? 0,
      })),
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
    this.treasuryContract = this.services.contractsService.getContractFor<Treasury>(ContractNames.TREASURY);
    return this.treasuryContract;
  }
}
