import { BigNumber } from 'ethers';
import { ContractNames, IContractsService } from './../services/ContractsService';
import { DI, IContainer, Registration } from 'aurelia';
import { Treasury } from '../models/treasury';

export type ITreasuryStore = TreasuryStore;
export const ITreasuryStore = DI.createInterface<ITreasuryStore>('TreasuryStore');

export class TreasuryStore {
  public totalSupply?: BigNumber;
  public totalValuation?: BigNumber;
  public treasuryDistribution?: number;
  public reservesDistribution?: number;
  private treasuryContract?: Treasury;
  constructor(@IContractsService private readonly contractService: IContractsService) {}

  public static register(container: IContainer): void {
    container.register(Registration.singleton(ITreasuryStore, TreasuryStore));
  }

  public async loadTokenData(): Promise<void> {
    if (this.totalValuation && this.totalSupply) return;
    const contract = this.getTreasuryContract();
    this.totalValuation = await contract?.totalValuation();
    this.totalSupply = await contract?.totalSupply();
    this.treasuryDistribution = (await this.getDistributionPercentage(ContractNames.TREASURY)).toNumber() / 100;
    this.reservesDistribution = (await this.getDistributionPercentage(ContractNames.RESERVE)).toNumber() / 100;
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
    const address = this.contractService.getContractAddress(contractName);
    if (!address || !this.totalSupply) return BigNumber.from(0);
    const tokens = await this.getTreasuryContract()?.balanceOf(address);
    return tokens?.div(this.totalSupply) ?? BigNumber.from(0);
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
