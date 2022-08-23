import { Address } from './../services/ethereum-service';
import { ContractNames, IContractsService } from './../services/ContractsService';
import { DI, IContainer, Registration } from 'aurelia';

export type IReserveStore = ReserveStore;
export const IReserveStore = DI.createInterface<IReserveStore>('ReserveStore');

export class ReserveStore {
  private reserveAddress: Address | null = null;

  constructor(@IContractsService private readonly contractService: IContractsService) {}
  public static register(container: IContainer): void {
    container.register(Registration.singleton(IReserveStore, ReserveStore));
  }

  private getReserveAddress(): Address | null {
    return this.contractService.getContractAddress(ContractNames.RESERVE);
  }
}
