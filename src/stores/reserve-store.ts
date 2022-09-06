import { Address } from './../services/ethereum-service';
import { BigNumber } from '@ethersproject/bignumber';
import { ContractNames } from '../services/contracts-service';
import { DI, IContainer, ILogger, Registration } from 'aurelia';
import { IServices } from 'services';
import { Reserve } from 'models/generated/reserve/Reserve';
import { callOnce } from 'decorators/call-once';

export type IReserveStore = ReserveStore;
export const IReserveStore = DI.createInterface<IReserveStore>('ReserveStore');

export class ReserveStore {
  public reserveValuation?: BigNumber;
  public supplyValuation?: BigNumber;
  public backing?: BigNumber;
  private reserveAddress: Address | null = null;
  private reserveContract?: Reserve;

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IReserveStore, ReserveStore));
  }
  constructor(@IServices private readonly services: IServices, @ILogger private readonly logger: ILogger) {}

  @callOnce()
  public async loadAssets(): Promise<void> {
    const contract = this.getReserveContract();
    if (!contract) return;
    const reserveStatus = await contract.reserveStatus();

    this.reserveValuation = reserveStatus[0];
    this.supplyValuation = reserveStatus[1];
    this.backing = reserveStatus[2];

    const erc20s = await contract.registeredERC20s(BigNumber.from(0));
    console.log('erc20s', erc20s);

    // let i = 0;
    // while (i != -1) {
    //   try {
    //     const asset = await this.getTreasuryAsset(contract, treasuryAddress, i);
    //     if (asset) {
    //       this.treasuryAssets.push(asset);
    //     }
    //     i++;
    //   } catch (ex) {
    //     i = -1;
    //   }
    // }
  }

  private getReserveContract(): Reserve | null {
    if (this.reserveContract) return this.reserveContract;
    if (!this.reserveAddress) {
      this.reserveAddress = this.getReserveAddress();
    }
    if (!this.reserveAddress) {
      this.logger.error(`No contract address was found for contract name ${ContractNames.RESERVE}`);
      return null;
    }
    this.reserveContract = this.services.contractsService.getContractAtAddress<Reserve>(
      ContractNames.RESERVE,
      this.reserveAddress,
      this.services.contractsService.createProvider(),
    );
    return this.reserveContract;
  }

  private getReserveAddress(): Address | null {
    return this.services.contractsService.getContractAddress(ContractNames.RESERVE);
  }
}
