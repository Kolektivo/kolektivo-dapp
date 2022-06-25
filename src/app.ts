import './app.scss';
import './shared.scss';
export class App {
  width = 200;
  sidebarOpen = true;
  get sidebarStyle() {
    return {
      transition: 'transform .5s',
      transform: this.sidebarOpen ? false : 'translateX(-80%)',
    };
  }
}
