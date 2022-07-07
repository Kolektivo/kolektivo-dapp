import { BindingMode, ICustomElementViewModel, bindable } from 'aurelia';
import { IRouter } from '@aurelia/router';
import { IfExistsThenTrue } from './../../../../design-system/common';

export class KSidebar implements ICustomElementViewModel {
  routes = [
    { name: 'Map', path: 'map' },
    { name: 'Treasury', path: 'treasury' },
    { name: 'Reserve', path: 'reserve' },
    { name: 'Swap', path: 'swap' },
  ];
  @bindable({ mode: BindingMode.twoWay }) open = true;
  @bindable({ set: IfExistsThenTrue }) collapsible = false;

  constructor(@IRouter private readonly router: IRouter) {}
}
