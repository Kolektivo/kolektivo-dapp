import { customElement, ICustomElementViewModel } from 'aurelia';

import kgImage from '../../../../../../images/token-icons/kG.png';
import { IReserveStore } from '../../../../../../stores/reserve-store';

import template from './token-info-card.html';

import './token-info-card.scss';

@customElement({ name: 'token-info-card', template })
export class TokenInfoCard implements ICustomElementViewModel {
  kgImage = kgImage;
  constructor(@IReserveStore private readonly reserveStore: IReserveStore) {}
}
