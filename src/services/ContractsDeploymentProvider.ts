import { Address, AllowedNetworks } from './EthereumService';
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
  public static initialized = false;
  private static contractInfosJson: IContractInfosJson;
  private static sharedContractAbisJson: ISharedContractInfos;

  public static register(container: IContainer) {
    Registration.singleton(IContractsDeploymentProvider, ContractsDeploymentProvider).register(container);
  }

  public static initialize(targetedNetwork: string): void {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // ContractsDeploymentProvider.contractInfosJson = require(`../contracts/${targetedNetwork}.json`) as IContractInfosJson;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // ContractsDeploymentProvider.sharedContractAbisJson = require('../contracts/sharedAbis.json') as ISharedContractInfos;
    this.initialized = true;
  }

  public static getContractAbi(contractName: string): [] {
    let abi = ContractsDeploymentProvider.contractInfosJson.contracts[contractName].abi;
    if (typeof abi === 'string') {
      // is name of shared abi, such as ERC20
      abi = ContractsDeploymentProvider.sharedContractAbisJson[abi];
    } else if (typeof abi === 'undefined') {
      // then maybe is shared by contract name
      abi = ContractsDeploymentProvider.sharedContractAbisJson[contractName];
    }
    return abi;
  }

  public static getContractAddress(contractName: string): Address {
    return ContractsDeploymentProvider.contractInfosJson.contracts[contractName].address;
  }
}