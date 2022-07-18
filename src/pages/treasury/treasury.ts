import './treasury.scss';
import { ICustomElementViewModel } from 'aurelia';
export class Treasury implements ICustomElementViewModel {
  routes = [
    { name: 'Overview', path: 'overview' },
    { name: 'Governance', path: 'governance' },
  ];

  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
