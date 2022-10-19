import { Address, IEthereumService } from '../services';
import { AllowedNetworks } from 'models/allowed-network';
import { DI, IContainer, Registration } from 'aurelia';
import { Hash } from './../services/ethereum-service';
import { IConfiguration } from 'configurations/configuration';
import { Web3Provider } from '@ethersproject/providers';

export type IBlockChainStore = BlockChainStore;
export const IBlockChainStore = DI.createInterface<IBlockChainStore>('BlockChainStore');

export class BlockChainStore {
  constructor(@IEthereumService private readonly ethereumService: IEthereumService, @IConfiguration private readonly configuration: IConfiguration) {}

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IBlockChainStore, BlockChainStore));
  }

  public get connectedWalletAddress(): Address | undefined {
    return this.ethereumService.defaultAccountAddress;
  }

  public get targetedNetwork(): AllowedNetworks {
    return this.configuration.chain;
  }

  public get walletConnected(): boolean {
    return !!this.connectedWalletAddress;
  }

  public connect(): void {
    void this.ethereumService.connect();
  }

  public connectKolektivoWallet(): void {
    void this.ethereumService.connectKolektivoWallet();
  }

  public connectToConnectedProvider(): Promise<void> {
    return this.ethereumService.connectToConnectedProvider();
  }

  public switchToTargetedNetwork(walletProvider: Web3Provider): Promise<boolean> {
    return this.ethereumService.switchToTargetedNetwork(walletProvider);
  }

  public disconnect(error: { code: number; message: string }): void {
    return this.ethereumService.disconnect(error);
  }

  public getEtherscanLink(addressOrHash: Address | Hash, tx = false): string {
    return this.ethereumService.getEtherscanLink(addressOrHash, tx);
  }

  public get connectedWalletEtherscanLink(): string {
    return this.ethereumService.getEtherscanLink(this.connectedWalletAddress);
  }
}
