import { type ChartDataset } from 'chart.js';
import { I18N } from '@aurelia/i18n';
import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import template from './value-over-time-card.html';

@customElement({ name: 'value-over-time-card', template })
export class ValueOverTimeCard implements ICustomElementViewModel {
  dataset: ChartDataset[] = [];
  constructor(@I18N private readonly i18n: I18N) {
    this.dataset = [
      {
        label: this.i18n.tr('navigation.reserve.risk.value-over-time.ceiling'),
        data: [56, 76, 65, 85, 63, 76, 87, 54, 65, 74],
        borderDash: [5],
        borderColor: 'rgba(30, 35, 37, 0.77)',
        tension: 0,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
      },
      {
        label: this.i18n.tr('navigation.reserve.risk.value-over-time.low-risk'),
        data: [34, 23, 35, 22, 32, 34, 23, 35, 22, 32],
        fill: true,
        backgroundColor: 'rgb(0, 160, 76)',
        tension: 0,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
      },
      {
        label: this.i18n.tr('navigation.reserve.risk.value-over-time.moderate-risk'),
        data: [56, 67, 48, 56, 48, 56, 67, 48, 56, 48],
        fill: true,
        backgroundColor: 'rgb(245, 161, 74)',
        tension: 0,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
      },
      {
        label: this.i18n.tr('navigation.reserve.risk.value-over-time.high-risk'),
        data: [75, 80, 70, 65, 75, 75, 80, 70, 65, 75],
        fill: true,
        backgroundColor: 'rgb(213, 92, 56)',
        tension: 0,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
      },
    ];
  }
}
