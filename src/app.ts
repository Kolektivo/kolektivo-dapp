import './app.scss';
import './shared.scss';
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

  constructor(@INotificationService private readonly confirmService: INotificationService) {}

  attached() {
    const closeMethod = this.confirmService.toast({ message: 'This is some test?', type: 'danger', actions: [{ content: 'Some crazy shit for closing this sun bith', onClick: () => closeMethod() }] });
  }

  cancel() {
    alert('cancel');
  }

  ok() {
    alert('ok');
  }
}
