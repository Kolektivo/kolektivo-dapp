import './app.scss';
import './shared.scss';
import { INotificationService } from '../design-system/services/notification-service';
export class App {
  width = 200;
  sidebarOpen = true;
  get sidebarStyle() {
    return {
      transition: 'transform .5s',
      transform: this.sidebarOpen ? false : 'translateX(-80%)',
    };
  }

  constructor(@INotificationService private readonly confirmService: INotificationService) {
    setTimeout(async () => {
      alert(await this.confirmService.confirm('This is a test confirmation DOOD'));
    }, 1000);
  }

  cancel() {
    alert('cancel');
  }

  ok() {
    alert('ok');
  }
}
