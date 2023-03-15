import { bindable, customElement, ICustomElementViewModel } from 'aurelia';

import template from './label-value.html';

import './label-value.scss';

@customElement({ template, name: 'label-value' })
export class LabelValue implements ICustomElementViewModel {
  @bindable public title?: string;
  @bindable public value?: string;
  @bindable public tooltipText?: string;
  @bindable public gap = 'var(--spacing-xs)';
}
