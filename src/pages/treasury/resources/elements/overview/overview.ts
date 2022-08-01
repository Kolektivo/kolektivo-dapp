import './overview.scss';
import { IKttCardData } from './ktt-card';

import { ICustomElementViewModel } from 'aurelia';

export class Overview implements ICustomElementViewModel {
  public kttCardData: IKttCardData = {
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
