import { Asset } from 'models/asset';
import { BigNumber } from '@ethersproject/bignumber';
import { ContractNames } from '../services/contracts-service';
import { DI, IContainer, Registration } from 'aurelia';
import { IContractStore } from './contract-store';
import { IServices, fromWei } from 'services';
import { Proposal } from 'models/proposal';
import { Transaction } from 'models/transaction';
import { Treasury } from 'models/generated/treasury/Treasury';
import { callOnce } from './../decorators/call-once';
import { delay } from 'utils';

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
  public proposals: Proposal[] = [];
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
    console.log(this.treasuryAssets);
  }

  @callOnce()
  public async loadProposals(): Promise<void> {
    await delay(1000);
    //TODO: replace test data with the real data from the contract when it's ready
    this.proposals = [
      {
        destinationAddress: '0x7605bBb40Ee29F1C568c411f8B5A3809eF9D3959',
        quantity: BigNumber.from(100),
        status: 'Executed',
        title: 'Bond tokens and send payout to recipient',
        token: {
          address: '0x434f234916Bbf0190BE3f058DeD9d8889953c4b4',
          chainId: 44787,
          decimals: 18,
          logoURI: 'https://gateway.pinata.cloud/ipfs/QmcRYtXPMK54EtwzPqP3Bs59x7oQzNN8X5X3oMZFHe1SBj/tt1.svg',
          price: 2068.82,
          symbol: 'TT1',
        },
        verified: true,
      },
      {
        destinationAddress: '0x8F635d25D2fc3E9a39f309C49891479Af0d7Fcd2',
        quantity: BigNumber.from(150),
        status: 'Pending',
        title: 'Do something different with the tokens and send it to people',
        token: {
          address: '0xd4482BAEa5c6426687a8F66de80bb857fE1942f1',
          chainId: 44787,
          decimals: 18,
          logoURI: 'https://gateway.pinata.cloud/ipfs/QmcRYtXPMK54EtwzPqP3Bs59x7oQzNN8X5X3oMZFHe1SBj/tt1.svg',
          name: 'Test Token #2',
          price: 1,
          symbol: 'TT2',
        },
        verified: false,
      },
      {
        destinationAddress: '0xc8dc2E36127ee9CD58aB9E28BFBa88f03D025C74',
        quantity: BigNumber.from(1337),
        status: 'Vetoed',
        title: 'Do risky things with tokens so the proposal gets vetoed',
        token: {
          address: '0x290DB975a9Aa2cb6e34FC0A09794945B383d7cCE',
          chainId: 44787,
          decimals: 18,
          logoURI: 'https://gateway.pinata.cloud/ipfs/QmcRYtXPMK54EtwzPqP3Bs59x7oQzNN8X5X3oMZFHe1SBj/tt1.svg',
          name: 'Test Token #3',
          price: 0.05,
          symbol: 'TT3',
        },
        verified: false,
      },
    ] as Proposal[];
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
