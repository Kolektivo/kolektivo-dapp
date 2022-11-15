import { customElement, ICustomElementViewModel } from 'aurelia';

import * as pages from './pages';
import template from './reserve-bonds.html';

import './reserve-bonds.scss';
@customElement({ name: 'reserve-bonds', template, dependencies: [pages] })
export class ReserveBonds implements ICustomElementViewModel {
  routes = [
    { name: 'Active Bonds', path: 'active-bonds' },
    { name: 'Active Redemptions', path: 'active-redemptions' },
  ];
}
