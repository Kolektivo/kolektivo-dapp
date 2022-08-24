import { Address, IServices, WalletProvider } from '../services';
import { DI, IContainer, Registration } from 'aurelia';

export type IBlockChainStore = BlockChainStore;
export const IBlockChainStore = DI.createInterface<IBlockChainStore>('BlockChainStore');

export class BlockChainStore {
  constructor(@IServices private readonly services: IServices) {}

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IBlockChainStore, BlockChainStore));
  }

  public get connectedWalletAddress(): Address | null {
    return this.services.ethereumService.defaultAccountAddress;
  }

  public get targetedNetwork(): AllowedNetworks | null {
    return this.services.ethereumService.targetedNetwork;
  }

  public get walletConnected(): boolean {
    return !!this.connectedWalletAddress;
  }

  public connect(): void {
    void this.services.ethereumService.connect();
  }

  public connectToConnectedProvider(): Promise<void> {
    return this.services.ethereumService.connectToConnectedProvider();
  }

  public switchToTargetedNetwork(walletProvider: WalletProvider): Promise<boolean> {
    return this.services.ethereumService.switchToTargetedNetwork(walletProvider);
  }

  public disconnect(error: { code: number; message: string }): void {
    return this.services.ethereumService.disconnect(error);
  }
}
