import './token-summary-stack.scss';
import { ICustomElementViewModel, bindable, customElement } from 'aurelia';
import template from './token-summary-stack.html';

@customElement({ template, name: 'token-summary-stack' })
export class TokenSummaryStack implements ICustomElementViewModel {
  @bindable public title?: string;
  @bindable public value?: string;
  @bindable public tooltip?: string;
}
