import { BindingMode, ICustomElementViewModel, bindable } from 'aurelia';
import { IRouter } from '@aurelia/router';
import { IfExistsThenTrue } from '../../../../design-system/common';
import { RouteLink } from '../../../models/common';

const routes: RouteLink[] = [
  { name: 'Map', path: 'map', location: 'top' },
  { name: 'Treasury', path: 'treasury', location: 'top' },
  { name: 'Reserve', path: 'reserve', location: 'top' },
  { name: 'Swap', path: 'swap', location: 'top' },
  { name: 'Documentation', path: 'documentation', location: 'bottom' },
  { name: 'Contact Kolektivo', path: 'contact', location: 'bottom' },
  { name: 'Download Wallet', path: 'download', location: 'bottom' },
  { name: 'Kolektivo.cw', path: 'swap', location: 'bottom' },
];
export class SideBar implements ICustomElementViewModel {
  @bindable({ mode: BindingMode.twoWay }) open = true;
  @bindable({ set: IfExistsThenTrue }) collapsible = false;

  constructor(@IRouter private readonly router: IRouter) {}

  getRoutes(location: RouteLink['location']) {
    return routes.filter(y => y.location === location);
  }
}
