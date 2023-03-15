import { bindable, customElement, ICustomElementViewModel } from 'aurelia';

import template from './stat-card.html';

import './stat-card.scss';

@customElement({ template, name: 'stat-card' })
export class StatCard implements ICustomElementViewModel {
  @bindable title?: string;
  @bindable tooltipText?: string;
  @bindable stat?: string;
}
