import './inner-nav.scss';
import { ICustomElementViewModel, bindable } from 'aurelia';
export class InnerNav implements ICustomElementViewModel {
  @bindable routes = [];
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
