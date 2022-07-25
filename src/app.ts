import './app.scss';
import './shared.scss';
import { AllowedNetworks, ICeloService, Networks } from './services';
import { IAnimationService } from '../design-system/services/animation/animation-service';
import { INotificationService } from '../design-system/services/notification/notification-service';
export class App {
  width = 200;
  sidebarOpen = true;
  get sidebarStyle(): Record<string, unknown> {
    return {
      transition: 'transform .5s',
      transform: this.sidebarOpen ? false : 'translateX(-80%)',
    };
  }
  header: HTMLElement;
  constructor(@INotificationService private readonly confirmService: INotificationService, @IAnimationService private readonly animationService: IAnimationService, @ICeloService private readonly celoService: ICeloService) {}

  async binding() {
    const network = process.env.NETWORK as AllowedNetworks;
    const inDev = process.env.NODE_ENV === 'development';
    this.celoService.initialize(network ?? (inDev ? Networks.Alfajores : Networks.Mainnet));
  }
}
