import './reserve.scss';
import { ICustomElementViewModel } from 'aurelia';
const routes = [
  { name: 'Reserve', path: 'dashboard' },
  { name: 'kCur', path: 'currency' },
  { name: 'Reserve Bonds', path: 'reserve-bonds' },
  { name: 'Risk', path: 'risk' },
  { name: 'Mento', path: 'mento' },
  { name: 'Governance', path: 'governance' },
];
export class Reserve implements ICustomElementViewModel {
  routes = routes;
}
