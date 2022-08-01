import './title-value.scss';
import { ICustomElementViewModel, bindable } from 'aurelia';

export class TitleValue implements ICustomElementViewModel {
  @bindable public title?: string;
  @bindable public value?: string;
  @bindable public tooltip?: string;
}
