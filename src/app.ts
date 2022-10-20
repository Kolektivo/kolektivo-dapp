import './app.scss';
import './shared.scss';
import { I18N } from '@aurelia/i18n';
import { IBlockChainStore } from 'stores';
import { IEventAggregator, ILogger, IPlatform, customElement } from 'aurelia';
import { INotificationService } from './design-system/services';
import { IObserverService } from 'services';
import { IStore } from './stores/store';
import { Network } from '@ethersproject/providers';
import template from './app.html';

type WrongNetworkInfo = { connectedTo?: string; need: string };
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
    @INotificationService private readonly notificationService: INotificationService,
    @ILogger private readonly logger: ILogger,
    @IObserverService private readonly observerService: IObserverService,
    @IBlockChainStore private readonly blockChainStore: IBlockChainStore,
  ) {
    this.observerService.listen(this.blockChainStore, 'network', this.chainChanged);
  }
  recalc = (): void => {
    this.xl = this.platform.window.innerWidth >= 1200;
    this.store.sideBarOpen = this.xl;
  };
  attaching(): void {
    this.platform.window.addEventListener('resize', this.recalc);
    this.recalc();
  }
  attached() {
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

  confirmChangeNetwork = async (): Promise<void> => {
    if (!this.confirmChangeNetworkInfo) return;
    try {
      this.showConfirmChangeNetworkInfo = false;
      if (!(await this.store.blockChainStore.switchToTargetedNetwork())) {
        this.cancelConfirmChangeNetwork(this.confirmChangeNetworkInfo);
      }
    } catch (e) {
      void this.notificationService.toast({ message: e as string, type: 'danger' });
    }
  };

  cancelConfirmChangeNetwork = (info: WrongNetworkInfo | undefined): void => {
    this.blockChainStore.disconnect();
    void this.notificationService.toast({
      message: `Please connect your wallet to ${info?.need ?? this.confirmChangeNetworkInfo?.need ?? this.i18n.tr('general.an-unknown-network')}`,
      type: 'danger',
    });

    this.showConfirmChangeNetworkInfo = false;
  };

  chainChanged = (network: Network) => {
    if (this.blockChainStore.isTargetedNetwork) return;
    this.confirmChangeNetworkInfo = {
      need: this.blockChainStore.targetedNetwork,
      connectedTo: network.name ?? this.i18n.tr('general.an-unknown-network'),
    };
    this.showConfirmChangeNetworkInfo = true;
  };
}
