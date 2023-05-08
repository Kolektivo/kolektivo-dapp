import { customElement, ICustomElementViewModel } from 'aurelia';

import KTT from '../../../../../../images/token-icons/KTT.png';

import { ITreasuryStore } from './../../../../../../stores/treasury-store';
import template from './token-info-card.html';

import './token-info-card.scss';

@customElement({ name: 'token-info-card', template })
export class TokenInfoCard implements ICustomElementViewModel {
  KTT = KTT;
  constructor(@ITreasuryStore private readonly treasuryStore: ITreasuryStore) {}
}
