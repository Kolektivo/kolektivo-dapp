import './app.scss';
import './shared.scss';
import { AllowedNetworks, IEthereumService, Networks } from './services';
import { IAnimationService } from '../design-system/services/animation/animation-service';
import { INotificationService } from '../design-system/services/notification/notification-service';
export class App {
  width = 200;
  sidebarOpen = true;
  testDate = '2022-08-10T13:42:35.209Z';

  get sidebarStyle(): Record<string, unknown> {
    return {
      transition: 'transform .5s',
      transform: this.sidebarOpen ? false : 'translateX(-80%)',
    };
  }
  header?: HTMLElement;
  constructor(
    @INotificationService private readonly confirmService: INotificationService,
    @IAnimationService private readonly animationService: IAnimationService,
    @IEthereumService private readonly ethereumService: IEthereumService,
  ) {}

  binding() {
    const network = process.env.NETWORK as AllowedNetworks | undefined;
    const inDev = process.env.NODE_ENV === 'development';
    this.ethereumService.initialize(network ?? (inDev ? Networks.Alfajores : Networks.Mainnet));
  }
}
