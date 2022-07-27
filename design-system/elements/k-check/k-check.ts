import { ICustomElementViewModel, bindable, capture } from 'aurelia';
import { uid } from '../../common';

@capture()
export class KCheck implements ICustomElementViewModel {
  @bindable id = uid();
}
