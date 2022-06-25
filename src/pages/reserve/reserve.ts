import './reserve.scss';
import { ICustomElementViewModel } from 'aurelia';
export class Reserve implements ICustomElementViewModel {
  routes = [
    { name: 'Reserve', path: 'dashboard' },
    { name: 'kCur', path: 'currency' },
    { name: 'Reserve Bonds', path: 'reserve-bonds' },
    { name: 'Risk', path: 'risk' },
    { name: 'Mento', path: 'mento' },
    { name: 'Governance', path: 'governance' },
  ];

  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
