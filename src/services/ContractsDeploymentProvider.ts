import { Address } from './ethereum-service';
import { DI, IContainer, Registration } from 'aurelia';

interface IContractInfo {
  address: Address;
  abi: [];
}

interface IContractInfosJson {
  name: AllowedNetworks;
  chainId: number;
  contracts: Record<string, IContractInfo>;
}

type ISharedContractInfos = Record<string, []>;

export type IContractsDeploymentProvider = ContractsDeploymentProvider;
export const IContractsDeploymentProvider = DI.createInterface<IContractsDeploymentProvider>('ContractsDeploymentProvider');

export class ContractsDeploymentProvider {
  private contractInfosJson?: IContractInfosJson;
  private sharedContractAbisJson?: ISharedContractInfos;

  public static register(container: IContainer) {
    Registration.singleton(IContractsDeploymentProvider, ContractsDeploymentProvider).register(container);
  }

  public async initialize(targetedNetwork: AllowedNetworks): Promise<void> {
    const network = targetedNetwork.toLowerCase();
    this.contractInfosJson = (await import(`../contracts/${network}.json`)) as IContractInfosJson;
    this.sharedContractAbisJson = (await import('../contracts/sharedAbis.json')) as unknown as ISharedContractInfos;
  }

  public getContractAbi(contractName: string): [] {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    let abi = this.contractInfosJson?.contracts[contractName]?.abi;
    if (typeof abi === 'string') {
      // is name of shared abi, such as ERC20
      abi = this.sharedContractAbisJson?.[abi];
    } else if (typeof abi === 'undefined') {
      // then maybe is shared by contract name
      abi = this.sharedContractAbisJson?.[contractName];
    }
    return abi ?? [];
  }

  public getContractAddress(contractName: string): Address | null {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return this.contractInfosJson?.contracts[contractName]?.address ?? null;
  }
}
