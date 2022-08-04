import './value-card.scss';
import { I18N } from '@aurelia/i18n';
import { ICustomElementViewModel, customElement } from 'aurelia';
import template from './value-card.html';

@customElement({ name: 'value-card', template })
export class ValueCard implements ICustomElementViewModel {
  public tooltip = '';
  constructor(@I18N private readonly i18n: I18N) {
    this.tooltip = this.i18n.tr('navigation.treasury.overview.value.tooltip');
  }
}
