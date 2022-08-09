import './app.scss';
import './shared.scss';
import { IAnimationService } from '../design-system/services/animation/animation-service';
import { IContractsService, IEthereumService, IIpfsService, IKolektivoIpfsClient, ITokenService, WalletProvider } from './services';
import { IEventAggregator, IPlatform, customElement } from 'aurelia';
import { INotificationService } from '../design-system/services/notification/notification-service';
import { IState } from './state';
import template from './app.html';

type WrongNetworkInfo = { provider: WalletProvider; connectedTo?: string; need: string };
@customElement({ name: 'app', template })
export class App {
  xl = false;
  confirmChangeNetworkInfo: WrongNetworkInfo | null = null;

  constructor(
    @INotificationService private readonly confirmService: INotificationService,
    @IAnimationService private readonly animationService: IAnimationService,
    @IEthereumService private readonly ethereumService: IEthereumService,
    @IKolektivoIpfsClient private readonly kolektivoIpfsClient: IKolektivoIpfsClient,
    @IIpfsService private readonly ipfsService: IIpfsService,
    @ITokenService private readonly tokenService: ITokenService,
    @IContractsService private readonly contractsService: IContractsService,
    @IState private readonly state: IState,
    @IEventAggregator private eventAggregator: IEventAggregator,
    @IPlatform private readonly platform: IPlatform,
  ) {}
  recalc = (): void => {
    this.xl = this.platform.window.innerWidth >= 1200;
    this.state.sideBarOpen = this.xl;
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
    // this.ethereumService.initialize(ethereumNetwork ?? (isDev ? Networks.Alfajores : Networks.Mainnet));
    // ContractsDeploymentProvider.initialize(EthereumService.targetedNetwork);
    // this.contractsService.initialize();
    // this.ipfsService.initialize(this.kolektivoIpfsClient);
    // /**
    //  * we want tokens to be all loaded before showing the app
    //  */
    // await this.tokenService.initialize();
  }

  async conformChangeNetwork(): Promise<void> {
    if (this.confirmChangeNetworkInfo) {
      const info = this.confirmChangeNetworkInfo;
      this.confirmChangeNetworkInfo = null;
      if (!(await this.ethereumService.switchToTargetedNetwork(info.provider))) {
        this.cancelConformChangeNetwork(info);
      }
    }
  }

  cancelConformChangeNetwork(info: WrongNetworkInfo | undefined): void {
    this.ethereumService.disconnect({ code: -1, message: 'wrong network' });
    this.eventAggregator.publish(
      'handleFailure',
      `Please connect your wallet to ${info?.need ?? this.confirmChangeNetworkInfo?.need ?? 'unknown network'}`,
    );
    this.confirmChangeNetworkInfo = null;
  }
}
