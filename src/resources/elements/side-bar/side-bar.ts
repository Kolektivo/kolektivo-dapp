import { BindingMode, ICustomElementViewModel, bindable } from 'aurelia';
import { IRouter } from '@aurelia/router';
import { RouteLink } from '../../../models/common';
import { ifExistsThenTrue } from '../../../../design-system/common';

const routes: RouteLink[] = [
  { name: 'Map', path: 'map', location: 'top' },
  { name: 'Treasury', path: 'treasury', location: 'top' },
  { name: 'Reserve', path: 'reserve', location: 'top' },
  { name: 'Swap', path: 'swap', location: 'top' },
  { name: 'Documentation', path: 'documentation', location: 'bottom' },
  { name: 'Contact Kolektivo', path: 'contact', location: 'bottom' },
  { name: 'Download Wallet', path: 'download', location: 'bottom' },
  { name: 'Kolektivo.cw', path: 'cw', location: 'bottom' },
];
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
