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
  private static contractInfosJson: IContractInfosJson;
  private static sharedContractAbisJson: ISharedContractInfos;

  public static register(container: IContainer) {
    Registration.singleton(IContractsDeploymentProvider, ContractsDeploymentProvider).register(container);
  }

  public static async initialize(targetedNetwork: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    ContractsDeploymentProvider.contractInfosJson = (await import(`../contracts/${targetedNetwork}.json`)) as IContractInfosJson;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    ContractsDeploymentProvider.sharedContractAbisJson = (await import('../contracts/sharedAbis.json')) as unknown as ISharedContractInfos;
  }

  public static getContractAbi(contractName: string): [] {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    let abi = ContractsDeploymentProvider.contractInfosJson.contracts[contractName]?.abi;
    if (typeof abi === 'string') {
      // is name of shared abi, such as ERC20
      abi = ContractsDeploymentProvider.sharedContractAbisJson[abi];
    } else if (typeof abi === 'undefined') {
      // then maybe is shared by contract name
      abi = ContractsDeploymentProvider.sharedContractAbisJson[contractName];
    }
    return abi;
  }

  public static getContractAddress(contractName: string): Address | null {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return ContractsDeploymentProvider.contractInfosJson.contracts[contractName]?.address ?? null;
  }
}
