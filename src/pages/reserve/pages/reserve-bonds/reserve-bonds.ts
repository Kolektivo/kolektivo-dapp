import './reserve-bonds.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';

import * as pages from './pages';
import template from './reserve-bonds.html';
@customElement({ name: 'reserve-bonds', template, dependencies: [pages] })
export class ReserveBonds implements ICustomElementViewModel {
  routes = [
    { name: 'Active Bonds', path: 'active-bonds' },
    { name: 'Active Redemptions', path: 'active-redemptions' },
  ];
}
