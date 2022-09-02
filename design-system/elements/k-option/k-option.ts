import './k-option.scss';
import { ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { captureFilter } from './../../common';
import template from './k-option.html';

@customElement({
  name: 'k-option',
  template,
  capture: captureFilter,
})
export class KOption implements ICustomElementViewModel {
  @bindable value?: string;
  @bindable text?: string;
}
