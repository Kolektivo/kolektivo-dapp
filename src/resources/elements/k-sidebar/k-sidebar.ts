import { BindingMode, ICustomElementViewModel, bindable } from 'aurelia';
import { IRouter } from '@aurelia/router';

export class KSidebar implements ICustomElementViewModel {
  routes = [
    { name: 'Map', path: 'map' },
    { name: 'Treasury', path: 'treasury' },
    { name: 'Reserve', path: 'reserve' },
    { name: 'Swap', path: 'swap' },
  ];
  @bindable({ mode: BindingMode.twoWay }) open = true;

  constructor(@IRouter private readonly router: IRouter) {}
}
