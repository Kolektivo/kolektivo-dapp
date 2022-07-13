import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';
import { IfExistsThenTrue, numberToPixels } from './../../common';
export type LoaderType = 'spinner';
export type LoaderFill = 'page' | 'parent';

export class KLoader implements ICustomElementViewModel {
  @bindable type: LoaderType = 'spinner';
  @bindable fill: LoaderFill = 'page';
  @bindable({ set: numberToPixels }) size = '75';
  @bindable({ set: IfExistsThenTrue }) overlay = false;

  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
(CustomElement.getDefinition(KLoader) as { capture: boolean }).capture = true;
