import { ICustomElementViewModel, alias } from 'aurelia';

@alias('kCur')
export class Currency implements ICustomElementViewModel {
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
