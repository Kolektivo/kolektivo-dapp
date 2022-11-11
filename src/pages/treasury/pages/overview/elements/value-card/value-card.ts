import { customElement, ICustomElementViewModel } from 'aurelia';

import { ITreasuryStore } from './../../../../../../stores/treasury-store';
import template from './value-card.html';

import './value-card.scss';

@customElement({ name: 'value-card', template })
export class ValueCard implements ICustomElementViewModel {
  constructor(@ITreasuryStore private readonly treasuryStore: ITreasuryStore) {}
}
