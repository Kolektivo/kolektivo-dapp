import './side-bar.scss';
import { BindingMode, ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { IRouter } from '@aurelia/router';
import { RouteLink } from '../../../models/common';
import { ifExistsThenTrue } from '../../../../design-system/common';
import template from './side-bar.html';

const routes: RouteLink[] = [
  { name: 'Map', path: 'map', location: 'top', icon: 'map' },
  { name: 'Treasury', path: 'treasury', location: 'top', icon: 'account_balance' },
  { name: 'Reserve', path: 'reserve', location: 'top', icon: 'savings' },
  { name: 'Swap', path: 'swap', location: 'top', icon: 'swap_horiz' },
  { name: 'Documentation', path: 'documentation', location: 'bottom', icon: 'description' },
  { name: 'Contact Kolektivo', path: 'contact', location: 'bottom', icon: 'headset_mic' },
  { name: 'Download Wallet', path: 'download', location: 'bottom', icon: 'account_balance_wallet' },
  { name: 'Kolektivo.cw', path: 'cw', location: 'bottom', icon: 'language' },
];

@customElement({ template, name: 'side-bar' })
export class SideBar implements ICustomElementViewModel {
  @bindable({ mode: BindingMode.twoWay }) open = true;
  @bindable({ set: ifExistsThenTrue }) collapsible = false;

  constructor(@IRouter private readonly router: IRouter) {
    if (process.env.NODE_ENV === 'development') {
      routes.push({ name: 'Storybook', path: 'storybook', location: 'bottom' });
    }
  }

  getRoutes(location: RouteLink['location']): RouteLink[] {
    return routes.filter((y) => y.location === location);
  }
}
