import { BadgeType } from 'models/badge-type';
import { Badger } from 'models/generated/governance/badger';
import { BigNumber } from 'ethers';
import { DI, IContainer, Registration } from 'aurelia';
import { IContractService, IServices } from 'services';
import { IObserverService } from 'services/observer-service';
import { Proposal, ProposalStatus } from 'models/proposal';
import { callOnce } from 'decorators/call-once';
import { delay } from 'utils';

export type IGovernanceStore = GovernanceStore;
export const IGovernanceStore = DI.createInterface<IGovernanceStore>('IGovernanceStore');

export class GovernanceStore {
  public proposals: Proposal[] = [];
  private badgerContract?: Badger;
  constructor(
    @IServices private readonly services: IServices,
    @IContractService private readonly contractService: IContractService,
    @IObserverService private readonly observerService: IObserverService,
  ) {
    this.observerService.listen(services.ethereumService, 'defaultAccountAddress', () => void this.loadBadges());
  }
  public static register(container: IContainer): void {
    container.register(Registration.singleton(IGovernanceStore, GovernanceStore));
  }

  @callOnce()
  public async loadProposals(): Promise<void> {
    await delay(1000);
    //TODO: replace test data with the real data from the contract when it's ready
    this.proposals = [
      {
        destinationAddress: '0x7605bBb40Ee29F1C568c411f8B5A3809eF9D3959',
        quantity: BigNumber.from(100),
        status: ProposalStatus.Executed,
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
        status: ProposalStatus.Pending,
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
        status: ProposalStatus.Vetoed,
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

  public async loadBadges(): Promise<void> {
    const contract = this.getBadgerContract();
    if (!contract) return;
    if (!this.services.ethereumService.defaultAccountAddress) return;
    const badgeNumbers: number[] = [];
    for (const badgeType in BadgeType) {
      const badgeNumber = Number(badgeType);
      if (badgeNumber) {
        badgeNumbers.push(badgeNumber);
      }
    }
    const balanceOf = await Promise.all(
      badgeNumbers.map(async (x) => await contract.balanceOf(this.services.ethereumService.defaultAccountAddress ?? '', BigNumber.from(x))),
    );
    console.log('Address', this.services.ethereumService.defaultAccountAddress);
    console.log('Badges', balanceOf);
  }

  private getBadgerContract(): Badger | null {
    if (this.badgerContract) return this.badgerContract;
    this.badgerContract = this.contractService.getGovernanceContract<Badger>('Badger');
    return this.badgerContract;
  }
}
