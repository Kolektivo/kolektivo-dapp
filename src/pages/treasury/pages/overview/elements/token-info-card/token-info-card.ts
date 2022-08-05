import './token-info-card.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import template from './token-info-card.html';

@customElement({ name: 'token-info-card', template })
export class KttCard implements ICustomElementViewModel {
  cardColor = 'linear-gradient(to right, var(--ocean-blue-500), var(--ocean-blue-600))';
  titlei18n = 'navigation.treasury.overview.ktt.title';
  supplyDistributioni18n =
    '[title]navigation.treasury.overview.ktt.supply-distribution;[tooltip]navigation.treasury.overview.ktt.supply-distribution-tooltip';
  totalSupplyi18n = '[title]navigation.treasury.overview.ktt.total-supply;[tooltip]navigation.treasury.overview.ktt.total-supply-tooltip';
  currentPricei18n = '[title]navigation.treasury.overview.ktt.current-price;[tooltip]navigation.treasury.overview.ktt.current-price-tooltip';
  marketCapi18n = '[title]navigation.treasury.overview.ktt.market-cap;[tooltip]navigation.treasury.overview.ktt.market-cap-tooltip';
}
