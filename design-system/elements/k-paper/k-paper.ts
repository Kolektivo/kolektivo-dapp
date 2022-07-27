import { ICustomElementViewModel } from 'aurelia';
import { Spaceable } from '../../../design-system/base/spaceable';

export class KPaper extends Spaceable implements ICustomElementViewModel {
  get style(): Record<string, string | undefined> {
    return this.spaceStyle;
  }
}
