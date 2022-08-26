import './value-card.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { ITreasuryStore } from './../../../../../../stores/treasury-store';
import template from './value-card.html';

@customElement({ name: 'value-card', template })
export class ValueCard implements ICustomElementViewModel {
  constructor(@ITreasuryStore private readonly treasuryStore: ITreasuryStore) {}
}
