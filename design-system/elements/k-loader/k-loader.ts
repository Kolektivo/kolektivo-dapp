import { CustomElement, ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { IfExistsThenTrue } from './../../common';
export type LoaderType = 'spinner';
export type LoaderFill = 'page' | 'parent';

@customElement({ name: 'k-loader' })
export class KLoader implements ICustomElementViewModel {
  @bindable type: LoaderType = 'spinner';
  @bindable fill: LoaderFill = 'page';
  @bindable({ set: IfExistsThenTrue }) overlay = false;

  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
(CustomElement.getDefinition(KLoader) as { capture: boolean }).capture = true;
