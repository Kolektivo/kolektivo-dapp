import { AllowedNetworks } from 'models/allowed-network';
import { DI, IContainer, Registration } from 'aurelia';
import { IAccountStore } from './account-store';
import { IConfiguration } from 'configurations/configuration';
import { IEthereumService } from '../services';
import { Web3Provider } from '@ethersproject/providers';

export type IBlockChainStore = BlockChainStore;
export const IBlockChainStore = DI.createInterface<IBlockChainStore>('BlockChainStore');

export class BlockChainStore {
  constructor(
    @IEthereumService private readonly ethereumService: IEthereumService,
    @IConfiguration private readonly configuration: IConfiguration,
    @IAccountStore private readonly accountStore: IAccountStore,
  ) {}

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IBlockChainStore, BlockChainStore));
  }

  public get targetedNetwork(): AllowedNetworks {
    return this.configuration.chain;
  }

  public get walletConnected(): boolean {
    return !!this.accountStore.walletAddress;
  }

  public async connect() {
    const provider = await this.ethereumService.connect();
    this.accountStore.web3Provider = new Web3Provider(provider);
  }

  public connectKolektivoWallet(): void {
    //
  }

  public connectToConnectedProvider() {
    return this.ethereumService.getMetaMaskProvider();
  }

  public switchToTargetedNetwork(walletProvider: Web3Provider) {
    return this.ethereumService.switchToTargetedNetwork(walletProvider);
  }

  public disconnect(): void {
    return (this.accountStore.walletAddress = undefined);
  }

  public getEtherscanLink(addressOrHash: string, tx = false): string {
    return this.ethereumService.getEtherscanLink(addressOrHash, tx);
  }

  public get connectedWalletEtherscanLink(): string {
    return this.ethereumService.getEtherscanLink(this.accountStore.walletAddress);
  }
}
