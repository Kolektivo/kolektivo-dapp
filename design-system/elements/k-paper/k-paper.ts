import { ICustomElementViewModel } from 'aurelia';
import { Spaceable } from '../../../design-system/base/spaceable';

export class KPaper extends Spaceable implements ICustomElementViewModel {
  constructor() {
    super();
    // you can inject the element or any DI in the constructor
  }

  get style(): Record<string, string> {
    return this.spaceStyle;
  }
}
