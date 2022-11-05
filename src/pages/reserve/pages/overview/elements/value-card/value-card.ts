import './value-card.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IReserveStore } from './../../../../../../stores/reserve-store';
import template from './value-card.html';

@customElement({ name: 'value-card', template })
export class ValueCard implements ICustomElementViewModel {
  constructor(@IReserveStore private readonly reserveStore: IReserveStore) {}
  get KTTPrice(): number {
    //TODO: Don't rely on the reserve assets to have KTT in it...when we get the address for KTT in the json get the oracle and get the price from there directly
    return this.reserveStore.reserveAssets?.find((x) => x.token.name === 'KTT')?.token.price ?? 0;
  }
}
