import { I18N } from '@aurelia/i18n';
import { customElement, ICustomElementViewModel, watch } from '@aurelia/runtime-html';

import { kCurSupplyData } from '../../../../../../models/chart-data';
import { Interval } from '../../../../../../models/interval';
import { PercentageValueConverter } from '../../../../../../resources';
import { IReserveStore } from '../../../../../../stores/reserve-store';
import { formatter, getXLabelFormat } from '../../../../../../utils';

import template from './supply-card.html';

import type { TooltipOptions } from 'chart.js';

@customElement({ name: 'supply-card', template })
export class SupplyCard implements ICustomElementViewModel {
  public loading = false;
  private currentInterval: Interval = Interval['1d'];
  private kCurSupplyData: kCurSupplyData[] = [];
  constructor(@IReserveStore private readonly reserveStore: IReserveStore, @I18N private readonly i18n: I18N, private readonly percentageValueConverter?: PercentageValueConverter) {}

  binding() {
    void this.intervalChanged();
  }
  get labels() {
    return this.kCurSupplyData.map((x) => formatter.format(x.createdAt).replace(',', ''));
  }
  @watch('currentInterval')
  async intervalChanged(): Promise<void> {
    this.loading = true;
    this.kCurSupplyData = await this.reserveStore.getkCurSupplyData(this.currentInterval);
    this.loading = false;
  }
  get tooltipOptions() {
    return {
      callbacks: {
        title: (x) => this.i18n.tr('timestamp', { date: new Date(x[0].label) }),
        label: (x) => {
          let value = x.raw;
          if (x.datasetIndex > 0) {
            value = (x.raw as number) - (x.chart.data.datasets[x.datasetIndex - 1]?.data[x.dataIndex] as number);
          }
          return `${x.dataset.label ?? ''}: ${this.percentageValueConverter?.toView((Number(value) / 100) as unknown as string) ?? ''}`;
        },
      },
    } as TooltipOptions;
  }
  get kCurCirculatingDistribution(): number[] {
    //always return 100 because this will fill the chart completely
    return this.kCurSupplyData.map(() => 100);
  }
  get kCurMentoDistribution(): number[] {
    //stacked chart so this has to be the sum of this and all below it
    return this.kCurSupplyData.map((x) => (x.kCurMentoDistribution + x.kCurPrimaryPoolDistribution + x.kCurReserveDistribution) * 100);
  }
  get kCurPrimaryPoolDistribution(): number[] {
    //stacked chart so this has to be the sum of this and all below it
    return this.kCurSupplyData.map((x) => (x.kCurPrimaryPoolDistribution + x.kCurReserveDistribution) * 100);
  }
  get kCurReserveDistribution(): number[] {
    return this.kCurSupplyData.map((x) => x.kCurReserveDistribution * 100);
  }
  get yLabelFormat(): Record<string, unknown> {
    return {
      callback: (value: number) => `${this.percentageValueConverter?.toView(Number(value) / 100, { fractionDigits: 0 }) ?? ''}`,
    };
  }
  get xLabelFormat(): Record<string, unknown> {
    return getXLabelFormat(this.currentInterval, this.i18n);
  }
  //TODO: Make i18n work in this method as a getter
  private dataSets(kCurCirculatingDistribution: number[], kCurMentoDistribution: number[], kCurPrimaryPoolDistribution: number[], kCurReserveDistribution: number[]) {
    return [
      {
        label: this.i18n.tr('navigation.reserve.k-cur.supply.reserve'),
        data: kCurReserveDistribution,
        fill: true,
        backgroundColor: 'rgb(76, 87, 92)',
        tension: 0,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
      },
      {
        label: this.i18n.tr('navigation.reserve.k-cur.supply.primary-pool'),
        data: kCurPrimaryPoolDistribution,
        fill: true,
        backgroundColor: 'rgb(42 166 161)',
        tension: 0,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
      },
      {
        label: this.i18n.tr('navigation.reserve.k-cur.supply.mento'),
        data: kCurMentoDistribution,
        fill: true,
        backgroundColor: 'rgb(245, 161, 74)',
        tension: 0,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
      },
      {
        label: this.i18n.tr('navigation.reserve.k-cur.supply.external'),
        data: kCurCirculatingDistribution,
        fill: true,
        backgroundColor: 'rgb(213, 92, 56)',
        tension: 0,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
      },
    ];
  }
}
