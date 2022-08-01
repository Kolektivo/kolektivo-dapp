import './app.scss';
import './shared.scss';
import { IAnimationService } from '../design-system/services/animation/animation-service';
import { IEthereumService, Networks } from './services';
import { INotificationService } from '../design-system/services/notification/notification-service';
import { customElement } from 'aurelia';
import { ethereumNetwork } from './environment-variables';
import { isDev } from './environment-variables';
import template from './app.html';

@customElement({ name: 'app', template })
export class App {
  width = 200;
  sidebarOpen = true;

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
    this.ethereumService.initialize(ethereumNetwork ?? (isDev ? Networks.Alfajores : Networks.Mainnet));
  }
}
