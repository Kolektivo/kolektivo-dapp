import './token-info-card.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { ITreasuryStore } from './../../../../../../stores/treasury-store';
import template from './token-info-card.html';

@customElement({ name: 'token-info-card', template })
export class TokenInfoCard implements ICustomElementViewModel {
  constructor(@ITreasuryStore private readonly treasuryStore: ITreasuryStore) {}
}
