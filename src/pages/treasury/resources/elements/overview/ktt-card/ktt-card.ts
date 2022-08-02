import './ktt-card.scss';
import { ICustomElementViewModel } from 'aurelia';

export class KttCard implements ICustomElementViewModel {
  public data = {
    marketCap: 3000000,
    currentPrice: 0.98,
    totalSupply: 8000000,
    supplyDistribution: {
      treasury: 40,
      reserves: 40,
      circulating: 20,
    },
  };
}
