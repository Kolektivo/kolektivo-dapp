import './label-value.scss';
import { ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { captureFilter } from './../../../../design-system/common';
import template from './label-value.html';

@customElement({ template, name: 'label-value', capture: captureFilter })
export class LabelValue implements ICustomElementViewModel {
  @bindable public title?: string;
  @bindable public value?: string;
  @bindable public tooltip?: string;
  @bindable public gap = 'var(--spacing)';
}
