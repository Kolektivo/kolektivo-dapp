import './token-summary-stack.scss';
import { ICustomElementViewModel, bindable } from 'aurelia';

export class TokenSummaryStack implements ICustomElementViewModel {
  @bindable public title?: string;
  @bindable public value?: string;
  @bindable public tooltip?: string;
}
