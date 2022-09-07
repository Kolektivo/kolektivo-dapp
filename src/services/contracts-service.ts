import { Address, Hash, IBlockInfoNative, IChainEventInfo, IEthereumService } from './ethereum-service';
import { BaseProvider, JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Signer } from '@ethersproject/abstract-signer';

import { BaseContract, Wallet, ethers } from 'ethers';
import { DI, IContainer, IEventAggregator, Registration } from 'aurelia';
import { IContractsDeploymentService } from './contracts-deployment-service';
import { callOnce } from '../decorators/call-once';

export enum ContractNames {
  ELASTICRECEIPTTOKEN = 'ElasticReceiptToken',
  GEONFT = 'GeoNFT',
  ORACLE = 'Oracle',
  RESERVE = 'Reserve',
  TREASURY = 'Treasury',
  VESTINGVAULT = 'VestingVault',
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  KCT = 'Kolektivo Curacao Token',
  KTT = 'Kolektivo Treasury Token',
}

export interface IStandardEvent<TArgs> {
  args: TArgs;
  transactionHash: Hash;
  blockNumber: number;
  getBlock(): Promise<IBlockInfoNative>;
}

export type IContractsService = ContractsService;
export const IContractsService = DI.createInterface<IContractsService>('ContractsService');
type SignerTypes = BaseProvider | (string & Signer) | JsonRpcSigner | Wallet;

export class ContractsService {
  public static register(container: IContainer) {
    Registration.singleton(IContractsService, ContractsService).register(container);
  }

  private static Contracts = new Map<ContractNames, Contract | null>([
    [ContractNames.ELASTICRECEIPTTOKEN, null],
    [ContractNames.GEONFT, null],
    [ContractNames.ORACLE, null],
    [ContractNames.RESERVE, null],
    [ContractNames.TREASURY, null],
    [ContractNames.VESTINGVAULT, null],
    [ContractNames.ERC20, null],
    [ContractNames.ERC721, null],
  ]);
  // org.zeppelinos.proxy.implementation
  private static storagePositionZep = '0x7050c9e0f4ca769c69bd3a8ef740bc37934f8e2c036e5a723fd8ee048ed3f8c3';
  // eip1967.proxy.implementation
  private static storagePosition1967 = '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';
  private initializingContracts?: Promise<void>;
  private initializingContractsResolver?: () => void;
  private networkInfo: IChainEventInfo | null = null;
  private accountAddress?: Address;

  constructor(
    @IEventAggregator private readonly eventAggregator: IEventAggregator,
    @IEthereumService private readonly ethereumService: IEthereumService,
    // @ICacheService private readonly cacheService: ICacheService,
    @IContractsDeploymentService private readonly contractsDeploymentProvider: IContractsDeploymentService,
  ) {}

  @callOnce('Contracts Service')
  // @cache<ContractsService>(function () {
  //   return {
  //     storage: this.cacheService,
  //   };
  // })
  public initialize() {
    this.eventAggregator.subscribe('Network.Changed.Account', (account: Address): void => {
      if (account !== this.accountAddress) {
        this.accountAddress = account;
        this.initializeContracts();
      }
    });

    const networkChange = (info: IChainEventInfo | null = null) => {
      if (
        this.networkInfo?.chainId !== info?.chainId ||
        this.networkInfo?.chainName !== info?.chainName ||
        this.networkInfo?.provider !== info?.provider
      ) {
        this.networkInfo = info;
      }
    };

    this.eventAggregator.subscribe('Network.Changed.Disconnect', (): void => {
      networkChange(null);
    });

    this.eventAggregator.subscribe('Network.Changed.Connected', (info: IChainEventInfo): void => {
      networkChange(info);
    });

    this.eventAggregator.subscribe('Network.Changed.Id', (info: IChainEventInfo): void => {
      networkChange(info);
    });

    this.initializeContracts();
  }
  public async getArraySize(address: string): Promise<BigNumber> {
    return ethers.BigNumber.from(await ethers.getDefaultProvider().getStorageAt(address, 19));
  }

  public getContractAbi(contractName: ContractNames): [] {
    return this.contractsDeploymentProvider.getContractAbi(contractName);
  }

  public getContractAddress(contractName: ContractNames | string): Address | null {
    return this.contractsDeploymentProvider.getContractAddress(contractName);
  }

  /**
   * get a provider meant to be used to create a Contract
   * @returns
   */
  public createProvider(): SignerTypes {
    let signerOrProvider;
    if (this.accountAddress && this.networkInfo?.provider) {
      signerOrProvider = Signer.isSigner(this.accountAddress) ? this.accountAddress : this.networkInfo.provider.getSigner(this.accountAddress);
    }

    if (!signerOrProvider) {
      signerOrProvider = this.ethereumService.providerForSigners;
    }

    return signerOrProvider;
  }

  public getContractFor<T extends BaseContract>(contractName: ContractNames): T {
    return (ContractsService.Contracts.get(contractName) ?? null) as unknown as T;
  }

  public getContractAtAddress<T extends BaseContract>(contractName: ContractNames, address: Address, signorOrProvider?: SignerTypes): T {
    return new Contract(address, this.getContractAbi(contractName), signorOrProvider ?? this.createProvider()) as unknown as T;
  }

  /**
   * Attempts to obtain the addresss of a proxy contract implementation.
   * Uses a heuristic described here:
   *     https://ethereum.stackexchange.com/questions/103143/how-do-i-get-the-implementation-contract-address-from-the-proxy-contract-address
   *
   * More info here:
   *     https://medium.com/etherscan-blog/and-finally-proxy-contract-support-on-etherscan-693e3da0714b
   *
   * @param proxyContract
   * @returns null if not found
   */
  public async getProxyImplementation(proxyContract: Address): Promise<Address | null> {
    let result = await this.ethereumService.providerForSigners.getStorageAt(proxyContract, ContractsService.storagePositionZep);
    if (BigNumber.from(result).isZero()) {
      result = await this.ethereumService.providerForSigners.getStorageAt(proxyContract, ContractsService.storagePosition1967);
    }

    const bnResult = BigNumber.from(result);

    return bnResult.isZero() ? null : bnResult.toHexString();
  }

  private setInitializingContracts(): void {
    if (!this.initializingContractsResolver) {
      /**
       * jump through this hook because the order of receipt of `EthereumService.onConnect`
       * is indeterminant, but we have to make sure `ContractsService.initializeContracts`
       * has completed before someone tries to use `this.Contracts` (see `getContractFor`).
       */
      this.initializingContracts = new Promise<void>((resolve: () => void) => {
        this.initializingContractsResolver = resolve;
      });
    }
  }

  private resolveInitializingContracts(): void {
    if (this.initializingContractsResolver) {
      this.initializingContractsResolver();
      this.initializingContractsResolver = undefined;
    }
  }

  private async assertContracts(): Promise<void> {
    return this.initializingContracts;
  }

  private initializeContracts(): void {
    /**
     * to assert that contracts are not available during the course of this method
     */
    if (!this.initializingContractsResolver) {
      this.setInitializingContracts();
    }

    const reuseContracts = // at least one arbitrary contract already exists
      ContractsService.Contracts.get(ContractNames.ERC20);

    const signerOrProvider = this.createProvider();

    ContractsService.Contracts.forEach((_contract, contractName) => {
      let contract: Contract | null;

      if (reuseContracts) {
        contract = ContractsService.Contracts.get(contractName)?.connect(signerOrProvider) ?? null;
      } else {
        const address = this.getContractAddress(contractName);
        if (address) {
          contract = this.getContractAtAddress(contractName, address, signerOrProvider);
        } else {
          contract = null;
        }
      }
      ContractsService.Contracts.set(contractName, contract);
    });

    this.eventAggregator.publish('Contracts.Changed');

    this.resolveInitializingContracts();
  }
}
