import { DI, IContainer, Registration } from 'aurelia';

import { delay } from '../utils';

import { Bacroles } from './../models/generated/governance/bacroles/Bacroles';
import { Proposal, ProposalStatus } from './../models/proposal';

import { callOnce } from 'decorators/call-once';
import { BigNumber, ContractTransaction, PopulatedTransaction } from 'ethers';
import { BadgeType } from 'models/badge-type';
import { Secretdelay } from 'models/generated/governance/secretdelay';
import { IContractService } from 'services/contract';

export type IGovernanceStore = GovernanceStore;
export const IGovernanceStore = DI.createInterface<IGovernanceStore>('IGovernanceStore');

export class GovernanceStore {
  public proposals: Proposal[] = [];
  constructor(@IContractService private readonly contractService: IContractService) {}
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

  public async submitDynamicMethod(isPublicProposal: boolean, data: PopulatedTransaction, ipfsHash?: string): Promise<ContractTransaction | undefined> {
    if (!data.to || !data.data) return;
    const secretDelayContract: Secretdelay = await this.contractService.getContract('governance', 'monetaryDelay');

    let dataParamBAC: PopulatedTransaction | undefined = undefined;
    if (isPublicProposal) {
      dataParamBAC = await secretDelayContract.populateTransaction.execTransactionFromModule(data.to, data.value ?? 0, data.data, BigNumber.from(0));
    } else {
      if (!ipfsHash) return;
      const salt = await secretDelayContract.salt();
      const hash = await secretDelayContract.getSecretTransactionHash(secretDelayContract.address, 0, data.data, BigNumber.from(0), salt);
      dataParamBAC = await secretDelayContract.populateTransaction.enqueueSecretTx(hash, ipfsHash);
    }
    const bacContract: Bacroles = await this.contractService.getContract('governance', 'bacMD');
    if (!dataParamBAC.to || !dataParamBAC.value || !dataParamBAC.data) return;
    const result = await bacContract.execTransactionFromModule(dataParamBAC.to, dataParamBAC.value, dataParamBAC.data, BigNumber.from(0), BadgeType.ECOLOGY_DELEGATE);
    return result;
  }
}
