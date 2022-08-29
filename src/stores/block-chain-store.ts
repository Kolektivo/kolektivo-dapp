import { Address, IEthereumService, WalletProvider } from '../services';
import { DI, IContainer, Registration } from 'aurelia';
import { Hash } from './../services/ethereum-service';

export type IBlockChainStore = BlockChainStore;
export const IBlockChainStore = DI.createInterface<IBlockChainStore>('BlockChainStore');

export class BlockChainStore {
  constructor(@IEthereumService private readonly ethereumService: IEthereumService) {}

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IBlockChainStore, BlockChainStore));
  }

  public get connectedWalletAddress(): Address | null {
    return this.ethereumService.defaultAccountAddress;
  }

  public get targetedNetwork(): AllowedNetworks | null {
    return this.ethereumService.targetedNetwork;
  }

  public get walletConnected(): boolean {
    return !!this.connectedWalletAddress;
  }

  public connect(): void {
    void this.ethereumService.connect();
  }

  public connectToConnectedProvider(): Promise<void> {
    return this.ethereumService.connectToConnectedProvider();
  }

  public switchToTargetedNetwork(walletProvider: WalletProvider): Promise<boolean> {
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
