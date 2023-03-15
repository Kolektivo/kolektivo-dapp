import { customElement, ICustomElementViewModel } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { watch } from '@aurelia/runtime-html';

import { ValueChartData } from '../../../../../../models/chart-data';
import { Interval } from '../../../../../../models/interval';
import { IReserveStore } from '../../../../../../stores/reserve-store';
import { formatter, getXLabelFormat } from '../../../../../../utils';

import { CurrencyValueConverter } from './../../../../../../design-system/value-converters/currency';
import template from './value-ratio-card.html';

import './value-ratio-card.scss';

import type { TooltipOptions } from 'chart.js';

@customElement({ name: 'value-ratio-card', template })
export class ValueRatioCard implements ICustomElementViewModel {
  public loading = false;
  private currentInterval: Interval = Interval['1d'];
  private data: ValueChartData[] = [];

  constructor(@IReserveStore private readonly reserveStore: IReserveStore, @I18N private readonly i18n: I18N, private readonly currencyValueConverter?: CurrencyValueConverter) {}

  binding() {
    void this.intervalChanged();
  }

  @watch('currentInterval')
  async intervalChanged(): Promise<void> {
    this.loading = true;
    this.data = await this.reserveStore.getkGuilderValueRatioOverTime(this.currentInterval);
    this.loading = false;
  }
  getButtonType(value: string, current: string) {
    return current === value ? 'primary' : 'secondary';
  }
  get labels() {
    return this.data.map((x) => formatter.format(x.createdAt).replace(',', ''));
  }
  get valueData(): number[] {
    return this.data.map((x) => x.value);
  }
  get baseLineData(): number[] {
    return this.data.map(() => 1);
  }
  get tooltipOptions() {
    return {
      itemSort: (a, b, data) => b.datasetIndex - a.datasetIndex,
      callbacks: {
        title: (x) => this.i18n.tr('timestamp', { date: new Date(x[0].label) }),
        label: (x) => (x.dataset.label ? `${x.dataset.label}: ${this.currencyValueConverter?.toView(`${x.raw as string}`) ?? ''}` : ''),
        labelColor: (context) => {
          return {
            backgroundColor: context.dataset.pointBorderColor,
            borderColor: context.dataset.pointBorderColor,
          };
        },
        labelPointStyle: (context) => {
          return {
            pointStyle: context.dataset.label === this.i18n.tr('navigation.reserve.k-guilder.value-ratio.price-parity') ? 'dash' : 'circle',
          };
        },
      },
    } as TooltipOptions;
  }
  get yLabelFormat(): Record<string, unknown> {
    return {
      callback: (value: number) => this.currencyValueConverter?.toView(value.toString()) ?? '',
    };
  }
  get xLabelFormat(): Record<string, unknown> {
    return getXLabelFormat(this.currentInterval, this.i18n);
  }
  //TODO: Make i18n work in this method as a getter
  private dataSets(valueData: number[], baseLineData: number[]) {
    return [
      {
        label: this.i18n.tr('navigation.reserve.k-guilder.value-ratio.price-parity'),
        data: baseLineData,
        borderDash: [5],
        borderColor: 'rgba(76, 87, 92, 0.05)',
        tension: 0,
        pointRadius: 0,
        pointBorderColor: 'rgba(76, 87, 92, 0.05)',
        pointBackgroundColor: '#FFFFFF',
        backgroundColor: 'transparent',
      },
      {
        label: this.i18n.tr('navigation.reserve.k-guilder.value-ratio.chart-tooltip'),
        data: valueData,
        fill: true,
        borderColor: 'rgba(69, 173, 168, 0.77)',
        tension: 0,
        pointRadius: 0,
        pointBorderColor: 'rgba(69, 173, 168, 0.77)',
        pointBackgroundColor: '#FFFFFF',
        backgroundColor: 'transparent',
      },
    ];
  }
}
