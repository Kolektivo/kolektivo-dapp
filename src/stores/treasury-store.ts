import { BigNumber } from 'ethers';
import { ContractNames, ContractsService, IContractsService } from './../services/ContractsService';
import { DI, IContainer, Registration } from 'aurelia';
import { Treasury } from '../models/treasury';

export type ITreasuryStore = TreasuryStore;
export const ITreasuryStore = DI.createInterface<ITreasuryStore>('TreasuryStore');

export class TreasuryStore {
  totalSupply?: BigNumber;
  totalValuation?: BigNumber;
  treasury?: number = 0.2;
  reserves?: number = 0.4;
  circulating?: number = 0.4;
  constructor(@IContractsService private readonly contractService: IContractsService) {}
  public static register(container: IContainer): void {
    container.register(Registration.singleton(ITreasuryStore, TreasuryStore));
  }
  async loadData() {
    const address = ContractsService.getContractAddress(ContractNames.TREASURY);
    if (address) {
      const treasuryContract = this.contractService.getContractAtAddress<Treasury>(
        ContractNames.TREASURY,
        address,
        this.contractService.createProvider(),
      );
      this.totalValuation = await treasuryContract.totalValuation();
      this.totalSupply = await treasuryContract.totalSupply();
    }
  }
  get currentPrice(): BigNumber {
    if (!this.totalSupply || !this.totalValuation) return BigNumber.from(0);
    return this.totalSupply.div(this.totalValuation);
  }
}
