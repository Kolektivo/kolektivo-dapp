import './reserve-bonds.scss';
import { ICustomElementViewModel } from 'aurelia';

export class ReserveBonds implements ICustomElementViewModel {
  routes = [
    { name: 'Active Bonds', path: 'active-bonds' },
    { name: 'Active Redemptions', path: 'active-redemptions' },
  ];
}
