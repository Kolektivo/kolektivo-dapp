import { ChartDataset } from 'chart.js';
import { I18N } from '@aurelia/i18n';
import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import template from './supply-card.html';

@customElement({ name: 'supply-card', template })
export class SupplyCard implements ICustomElementViewModel {
  dataset: ChartDataset[] = [];
  constructor(@I18N private readonly i18n: I18N) {
    this.dataset = [
      {
        label: this.i18n.tr('navigation.reserve.k-cur.supply.reserve'),
        data: [34, 23, 35, 22, 32, 34, 23, 35, 22, 32],
        fill: true,
        backgroundColor: 'rgb(76, 87, 92)',
        tension: 0,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
      },
      {
        label: this.i18n.tr('navigation.reserve.k-cur.supply.primary-pool'),
        data: [56, 67, 48, 56, 48, 56, 67, 48, 56, 48],
        fill: true,
        backgroundColor: 'rgb(42 166 161)',
        tension: 0,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
      },
      {
        label: this.i18n.tr('navigation.reserve.k-cur.supply.mento'),
        data: [75, 80, 70, 65, 75, 75, 80, 70, 65, 75],
        fill: true,
        backgroundColor: 'rgb(245, 161, 74)',
        tension: 0,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
      },
      {
        label: this.i18n.tr('navigation.reserve.k-cur.supply.external'),
        data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        fill: true,
        backgroundColor: 'rgb(213, 92, 56)',
        tension: 0,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
      },
    ];
  }
}
