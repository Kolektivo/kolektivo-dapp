import { customElement, ICustomElementViewModel } from 'aurelia';

import kCUR from '../../../../../../images/token-icons/kCUR.png';
import { IReserveStore } from '../../../../../../stores/reserve-store';

import template from './token-info-card.html';

import './token-info-card.scss';
@customElement({ name: 'token-info-card', template })
export class TokenInfoCard implements ICustomElementViewModel {
  kCUR = kCUR;
  constructor(@IReserveStore private readonly reserveStore: IReserveStore) {}
}
