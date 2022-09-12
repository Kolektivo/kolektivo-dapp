import { Asset } from 'models/asset';
import { BigNumber } from '@ethersproject/bignumber';
import { ContractNames } from '../services/contracts-service';
import { DI, IContainer, Registration } from 'aurelia';
import { IContractStore } from './contract-store';
import { IServices } from 'services';
import { Reserve } from 'models/generated/reserve/Reserve';
import { Transaction } from 'models/transaction';
import { callOnce } from 'decorators/call-once';

export type IReserveStore = ReserveStore;
export const IReserveStore = DI.createInterface<IReserveStore>('ReserveStore');

export class ReserveStore {
  public reserveValuation?: BigNumber;
  public supplyValuation?: BigNumber;
  public backing?: BigNumber;
  private reserveContract?: Reserve;
  public transactions: Transaction[] = [];
  public reserveAssets?: (Asset | undefined)[] = [];

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IReserveStore, ReserveStore));
  }
  constructor(@IServices private readonly services: IServices, @IContractStore private readonly contractStore: IContractStore) {}

  @callOnce()
  public async loadAssets(): Promise<void> {
    const contract = this.getReserveContract();
    if (!contract) return;
    const reserveAddress = this.services.contractsService.getContractAddress(ContractNames.RESERVE) ?? '';
    if (!reserveAddress) return;
    //get all token addresses from the contract
    const addresses = (
      await Promise.all([contract.allRegisteredERC20s(), contract.allRegisteredERC721Ids().then((x) => x.map((y) => y.erc721))])
    ).flatMap((x) => x);
    //get all token asset data
    this.reserveAssets = await Promise.all(
      addresses.map(
        (address): Promise<Asset | undefined> =>
          // eslint-disable-next-line @typescript-eslint/unbound-method
          this.contractStore.getAsset(address, contract, reserveAddress, this.transactions, contract.typeOfAsset),
      ),
    );
    const reserveStatus = await contract.reserveStatus();
    this.reserveValuation = reserveStatus[0];
    this.supplyValuation = reserveStatus[1];
    this.backing = reserveStatus[2];
  }

  private getReserveContract(): Reserve | null {
    if (this.reserveContract) return this.reserveContract;
    this.reserveContract = this.services.contractsService.getContractFor<Reserve>(ContractNames.RESERVE);
    return this.reserveContract;
  }
}
