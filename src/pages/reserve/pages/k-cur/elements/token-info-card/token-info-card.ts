import './token-info-card.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IReserveStore } from 'stores/reserve-store';
import template from './token-info-card.html';

@customElement({ name: 'token-info-card', template })
export class TokenInfoCard implements ICustomElementViewModel {
  constructor(@IReserveStore private readonly reserveStore: IReserveStore) {}
}
