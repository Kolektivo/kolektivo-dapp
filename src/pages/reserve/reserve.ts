import { ICustomElementViewModel, customElement } from 'aurelia';

import './reserve.scss';
import template from './reserve.html';

const routes = [
  { name: 'Reserve', path: 'dashboard' },
  { name: 'kCur', path: 'currency' },
  { name: 'Reserve Bonds', path: 'reserve-bonds' },
  { name: 'Risk', path: 'risk' },
  { name: 'Mento', path: 'mento' },
  { name: 'Governance', path: 'governance' },
];

@customElement({ name: 'reserve', template })
export class Reserve implements ICustomElementViewModel {
  routes = routes;
}
