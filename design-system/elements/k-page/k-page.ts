import { ICustomElementViewModel, bindable, capture } from 'aurelia';

@capture
export class KPage implements ICustomElementViewModel {
  @bindable title?: string;
}
