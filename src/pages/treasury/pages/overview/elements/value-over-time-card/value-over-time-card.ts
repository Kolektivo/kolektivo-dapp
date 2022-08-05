import './value-over-time-card.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import template from './value-over-time-card.html';

@customElement({ name: 'value-over-time-card', template })
export class ValueOverTimeCard implements ICustomElementViewModel {
  currentFilter = '1d';
  getButtonType(value: string) {
    this.currentFilter !== value ? 'primary' : 'secondary';
  }
}
