import './ktt-card.scss';
import { ICustomElementViewModel, bindable } from 'aurelia';

export interface IKttCardData {
  marketCap: number;
  currentPrice: number;
  totalSupply: number;
  supplyDistribution: {
    treasury: number;
    reserves: number;
    circulating: number;
  };
}

export class KttCard implements ICustomElementViewModel {
  @bindable public data?: IKttCardData;
}
