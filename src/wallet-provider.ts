import { DI } from 'aurelia';
import { ExternalProvider, type Web3Provider } from '@ethersproject/providers';
import { IWalletConnector } from 'wallet-connector';

export type IWalletProvider<T extends ProviderType = ProviderType> = WalletProvider<T>;
export const IWalletProvider = DI.createInterface<IWalletProvider>();

interface IEIP1193 {
  on(eventName: 'accountsChanged', handler: (accounts: string[]) => void): void;
  on(eventName: 'chainChanged', handler: (chainId: number) => void): void;
  on(eventName: 'connect', handler: (info: { chainId: number }) => void): void;
  on(eventName: 'disconnect', handler: (error: { code: number; message: string }) => void): void;
}
export type ProviderType = Web3Provider & IEIP1193 & ExternalProvider;

export class WalletProvider<T extends ProviderType = ProviderType> {
  public provider?: T;
  constructor(@IWalletConnector private readonly walletConnector: IWalletConnector) {}

  public async connect(connectTo?: string): Promise<void> {
    this.provider = connectTo ? ((await this.walletConnector.connectTo(connectTo)) as T) : ((await this.walletConnector.connect()) as T);
  }
}
