import { BigNumber } from 'ethers';
import { ContractNames, IContractsService } from './../services/ContractsService';
import { DI, IContainer, Registration } from 'aurelia';
import { Treasury } from '../models/treasury';

export type ITreasuryStore = TreasuryStore;
export const ITreasuryStore = DI.createInterface<ITreasuryStore>('TreasuryStore');

export class TreasuryStore {
  public totalSupply?: BigNumber;
  public totalValuation?: BigNumber;
  public treasury?: number = 0.2;
  public reserves?: number = 0.4;
  public circulating?: number = 0.4;
  private treasuryContract?: Treasury;
  constructor(@IContractsService private readonly contractService: IContractsService) {}
  public static register(container: IContainer): void {
    container.register(Registration.singleton(ITreasuryStore, TreasuryStore));
  }
  public async loadValuationAndSupply(): Promise<void> {
    if (this.totalValuation && this.totalSupply) return;
    const contract = this.getTreasuryContract();
    this.totalValuation = await contract?.totalValuation();
    this.totalSupply = await contract?.totalSupply();
  }
  public get currentPrice(): BigNumber {
    if (!this.totalSupply || !this.totalValuation) return BigNumber.from(0);
    return this.totalSupply.div(this.totalValuation);
  }
  private getTreasuryContract(): Treasury | null {
    if (this.treasuryContract) return this.treasuryContract;
    const treasuryAddress = this.contractService.getContractAddress(ContractNames.TREASURY);
    if (treasuryAddress) {
      this.treasuryContract = this.contractService.getContractAtAddress<Treasury>(
        ContractNames.TREASURY,
        treasuryAddress,
        this.contractService.createProvider(),
      );
      return this.treasuryContract;
    }
    return null;
  }
}
