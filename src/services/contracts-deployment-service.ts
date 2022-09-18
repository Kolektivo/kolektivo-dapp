import { Address } from './ethereum-service';
import { DI, IContainer, ILogger, Registration } from 'aurelia';
import { getAddress } from '@ethersproject/address';

interface IUnsharedContractInfo {
  address: Address;
  abi: [];
}

/**
 * string is the name of the contract
 */
type IUnsharedContractInfos = Record<string, IUnsharedContractInfo>;

interface IUnsharedContractInfosJson {
  name: AllowedNetworks;
  chainId: number;
  contracts: IUnsharedContractInfos;
}

/**
 * string is the name of the contract
 */
type ISharedContractInfos = Record<string, []>;

type IContractAddressSpec = Address | string | undefined;

type ContractAddressMapEntry = [string, IContractAddressSpec];
type IContractAbiMapEntry = [string, string | []];

export type IContractsDeploymentService = ContractsDeploymentService;
export const IContractsDeploymentService = DI.createInterface<IContractsDeploymentService>('ContractsDeploymentService');

export class ContractsDeploymentService {
  /**
   * name => abi or name of a shared contract
   */
  private contractAbis = new Map<string, string | []>();
  /**
   * contract name => address or another contract name or undefined
   */
  private contractAddresses = new Map<string, IContractAddressSpec>();

  public static register(container: IContainer) {
    Registration.singleton(IContractsDeploymentService, ContractsDeploymentService).register(container);
  }

  constructor(@ILogger private readonly logger: ILogger) {}

  public async initialize(targetedNetwork: AllowedNetworks): Promise<void> {
    const abiProviderRepos = ['monetary', 'governance', 'map'];
    const network = targetedNetwork.toLowerCase();

    /**
     * enumerate the repos that provide ABIs
     */
    for (const repoFolderName of abiProviderRepos) {
      const repoContractInfosJson = ((await import(`../contracts/${repoFolderName}/${network}.json`)) as unknown as IUnsharedContractInfosJson)
        .contracts;
      const repoSharedContractAbisJson = (await import(`../contracts/${repoFolderName}/sharedAbis.json`)) as unknown as ISharedContractInfos;

      /**
       * convert into maps of addresses and ABIs
       */
      const unsharedRepoContents = this.getRepoMaps(repoContractInfosJson, false);
      const sharedRepoContents = this.getRepoMaps(repoSharedContractAbisJson, true);

      this.validateContracts(unsharedRepoContents.addresses);
      this.validateContracts(sharedRepoContents.addresses);
      /**
       * merge in the validated contracts
       */
      this.contractAddresses = new Map([...this.contractAddresses, ...unsharedRepoContents.addresses, ...sharedRepoContents.addresses]);
      this.contractAbis = new Map([...this.contractAbis, ...unsharedRepoContents.abis, ...sharedRepoContents.abis]);
    }
  }

  /**
   * report on contract name redundancies and address conflicts
   * @param newContracts
   */
  private validateContracts(newContracts: Map<string, Address | undefined>) {
    for (const newContractName of newContracts.keys()) {
      /**
       * We are not checking here as to whether two contract names are the same but have different character cases.
       */
      if (this.contractAddresses.has(newContractName)) {
        /**
         * Then this contract has already been added.  If there is an address conflict then we die.
         * Else we log a warning and we're overwrite. The old will be overwritten with the new.
         */
        const previousContractAddress = this.contractAddresses.get(newContractName);
        if (previousContractAddress?.toLowerCase() !== newContracts.get(newContractName)?.toLowerCase()) {
          throw new Error(`the same contract ABI is presented twice with two different addresses: ${newContractName}`);
        } else {
          this.logger.warn(`the same contract ABI is represented twice: ${newContractName}: ${previousContractAddress ?? '[unknown]'}`);
        }
      }
    }
  }

  private getRepoMaps(
    contractInfos: IUnsharedContractInfos | ISharedContractInfos,
    isShared: boolean,
  ): { addresses: Map<string, IContractAddressSpec>; abis: Map<string, [] | string> } {
    let addressEntries = new Array<ContractAddressMapEntry>();
    let abiEntries = new Array<IContractAbiMapEntry>();

    if (isShared) {
      addressEntries = Object.keys(contractInfos).map((name: string) => [name, undefined]);
      abiEntries = Object.keys(contractInfos).map((name: string) => [name, (contractInfos as ISharedContractInfos)[name]]);
    } else {
      addressEntries = Object.keys(contractInfos).map((name: string) => {
        const address = getAddress((contractInfos as IUnsharedContractInfos)[name].address);
        return [name, address];
      });
      abiEntries = Object.keys(contractInfos).map((name: string) => {
        const abi = (contractInfos as IUnsharedContractInfos)[name].abi;
        return [name, abi];
      });
    }
    return { addresses: new Map(addressEntries), abis: new Map(abiEntries) };
  }

  public getContractAbi(contractName: string): [] {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    let abi = this.contractAbis.get(contractName);
    if (typeof abi === 'string') {
      // is name of shared abi, such as ERC20
      abi = this.contractAbis.get(abi);
    }
    return (abi as [] | undefined) ?? [];
  }

  public getContractAddress(contractName: string): Address | null {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return this.contractAddresses.get(contractName) ?? null;
  }
}
