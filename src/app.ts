import './app.scss';
import './shared.scss';
import { ContractsDeploymentProvider, EthereumService, Networks, WalletProvider } from './services';
import { IEventAggregator, IPlatform, customElement } from 'aurelia';
import { IStore } from './stores/store';
import { ethereumNetwork, isDev } from './environment-variables';
import template from './app.html';

type WrongNetworkInfo = { provider: WalletProvider; connectedTo?: string; need: string };
@customElement({ name: 'app', template })
export class App {
  xl = false;
  confirmChangeNetworkInfo: WrongNetworkInfo | null = null;

  constructor(
    @IStore private readonly store: IStore,
    @IEventAggregator private eventAggregator: IEventAggregator,
    @IPlatform private readonly platform: IPlatform,
  ) {}
  recalc = (): void => {
    this.xl = this.platform.window.innerWidth >= 1200;
    this.store.sideBarOpen = this.xl;
  };
  attaching(): void {
    this.platform.window.addEventListener('resize', this.recalc);
    this.recalc();
  }
  attached(): void {
    this.eventAggregator.subscribe('Network.wrongNetwork', (info: WrongNetworkInfo): void => {
      /**
       * This will put up a modal to prompt the user to change the network.  Handlers are below.
       */
      this.confirmChangeNetworkInfo = info;
    });
  }
  detaching(): void {
    this.platform.window.removeEventListener('resize', this.recalc);
  }
  async binding(): Promise<void> {
    this.store.services.ethereumService.initialize(ethereumNetwork ?? (isDev ? Networks.Alfajores : Networks.Mainnet));
    ContractsDeploymentProvider.initialize(EthereumService.targetedNetwork);
    this.store.services.contractsService.initialize();
    this.store.services.ipfsService.initialize(this.store.services.kolektivoService);
    /**
     * we want tokens to be all loaded before showing the app
     */
    await this.store.services.tokenService.initialize();
  }

  async conformChangeNetwork(): Promise<void> {
    if (this.confirmChangeNetworkInfo) {
      const info = this.confirmChangeNetworkInfo;
      this.confirmChangeNetworkInfo = null;
      if (!(await this.store.services.ethereumService.switchToTargetedNetwork(info.provider))) {
        this.cancelConformChangeNetwork(info);
      }
    }
  }

  cancelConformChangeNetwork(info: WrongNetworkInfo | undefined): void {
    this.store.services.ethereumService.disconnect({ code: -1, message: 'wrong network' });
    this.eventAggregator.publish(
      'handleFailure',
      `Please connect your wallet to ${info?.need ?? this.confirmChangeNetworkInfo?.need ?? 'unknown network'}`,
    );
    this.confirmChangeNetworkInfo = null;
  }
}
