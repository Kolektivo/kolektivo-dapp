import './app.scss';
import './shared.scss';
import { IAnimationService } from '../design-system/services/animation/animation-service';
import { INotificationService } from '../design-system/services/notification/notification-service';
export class App {
  width = 200;
  sidebarOpen = true;
  get sidebarStyle() {
    return {
      transition: 'transform .5s',
      transform: this.sidebarOpen ? false : 'translateX(-80%)',
    };
  }
  header: HTMLElement;
  constructor(@INotificationService private readonly confirmService: INotificationService, @IAnimationService private readonly animationService: IAnimationService) {}
}
