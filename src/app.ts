import './app.scss';
import './shared.scss';
import { AllowedNetworks, ICeloService, Networks } from './services';
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

  constructor(
    @INotificationService private readonly confirmService: INotificationService,
    @ICeloService private readonly celoService: ICeloService,
  ) {
    // setTimeout(async () => {
    //   alert(await this.confirmService.confirm('This is a test confirmation DOOD'));
    // }, 1000);
  }

  async binding() {
    const network = process.env.NETWORK as AllowedNetworks;
    const inDev = process.env.NODE_ENV === 'development';
    this.celoService.initialize(network ?? (inDev ? Networks.Alfajores : Networks.Mainnet));
  }

  cancel() {
    alert('cancel');
  }

  ok() {
    alert('ok');
  }
}
