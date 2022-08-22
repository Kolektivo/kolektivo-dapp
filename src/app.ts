import './app.scss';
import './shared.scss';
import { EthereumService, Networks, WalletProvider } from './services';
import { I18N } from '@aurelia/i18n';
import { IEventAggregator, IPlatform, customElement } from 'aurelia';
import { IStore } from './stores/store';
import { ethereumNetwork, isDev } from './environment-variables';
import template from './app.html';

type WrongNetworkInfo = { provider: WalletProvider; connectedTo?: string; need: string };
@customElement({ name: 'app', template })
export class App {
  xl = false;
  showConfirmChangeNetworkInfo = false;
  confirmChangeNetworkInfo: WrongNetworkInfo | null = null;

  constructor(
    @IStore private readonly store: IStore,
    @IEventAggregator private eventAggregator: IEventAggregator,
    @IPlatform private readonly platform: IPlatform,
    @I18N private readonly i18n: I18N,
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
      this.confirmChangeNetworkInfo = Object.assign(info, { connectedTo: info.connectedTo ?? this.i18n.tr('general.an-unknown-network') });
      this.showConfirmChangeNetworkInfo = true;
    });
  }
  detaching(): void {
    this.platform.window.removeEventListener('resize', this.recalc);
  }
  async binding(): Promise<void> {
    await this.store.services.ethereumService.initialize(ethereumNetwork ?? (isDev ? Networks.Alfajores : Networks.Mainnet));
    await this.store.services.contractsDeploymentProvider.initialize(EthereumService.targetedNetwork);
    this.store.services.contractsService.initialize();
    this.store.services.ipfsService.initialize(this.store.services.kolektivoService);
    await this.store.services.tokenService.initialize();
  }

  async confirmChangeNetwork(): Promise<void> {
    if (this.confirmChangeNetworkInfo) {
      const info = this.confirmChangeNetworkInfo;
      this.confirmChangeNetworkInfo = null;
      this.showConfirmChangeNetworkInfo = false;
      if (!(await this.store.services.ethereumService.switchToTargetedNetwork(info.provider))) {
        this.cancelConfirmChangeNetwork(info);
      }
    }
  }

  cancelConfirmChangeNetwork(info: WrongNetworkInfo | undefined): void {
    this.store.services.ethereumService.disconnect({ code: -1, message: 'wrong network' });
    this.eventAggregator.publish(
      'handleFailure',
      `Please connect your wallet to ${info?.need ?? this.confirmChangeNetworkInfo?.need ?? 'unknown network'}`,
    );
    this.confirmChangeNetworkInfo = null;
    this.showConfirmChangeNetworkInfo = false;
  }
}
