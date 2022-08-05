import './app.scss';
import './shared.scss';
import { IAnimationService } from '../design-system/services/animation/animation-service';
import { IEthereumService } from './services';
import { INotificationService } from '../design-system/services/notification/notification-service';
import { IPlatform, customElement } from 'aurelia';
import { IState } from './state';
import template from './app.html';

@customElement({ name: 'app', template })
export class App {
  xl = false;
  constructor(
    @INotificationService private readonly confirmService: INotificationService,
    @IAnimationService private readonly animationService: IAnimationService,
    @IEthereumService private readonly ethereumService: IEthereumService,
    @IState private readonly state: IState,
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
  detaching(): void {
    this.platform.window.removeEventListener('resize', this.recalc);
  }
}
