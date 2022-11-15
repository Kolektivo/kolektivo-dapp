import { customElement, ICustomElementViewModel } from 'aurelia';

import template from './token-info-card.html';

import './token-info-card.scss';

import { IReserveStore } from 'stores/reserve-store';

@customElement({ name: 'token-info-card', template })
export class TokenInfoCard implements ICustomElementViewModel {
  constructor(@IReserveStore private readonly reserveStore: IReserveStore) {}
}
