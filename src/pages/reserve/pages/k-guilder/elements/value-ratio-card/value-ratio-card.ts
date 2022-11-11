import { customElement, ICustomElementViewModel } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { watch } from '@aurelia/runtime-html';

import { CurrencyValueConverter } from './../../../../../../design-system/value-converters/currency';
import template from './value-ratio-card.html';

import './value-ratio-card.scss';

import type { TooltipOptions } from 'chart.js';
import type { _DeepPartialObject } from 'chart.js/types/utils';
import { ValueChartData } from 'models/chart-data';
import { Interval } from 'models/interval';
import { IReserveStore } from 'stores/reserve-store';
import { formatter, getXLabelFormat } from 'utils';

@customElement({ name: 'value-ratio-card', template })
export class ValueRatioCard implements ICustomElementViewModel {
  public loading = false;
  private currentInterval: Interval = Interval['1d'];
  private data: ValueChartData[] = [];

  constructor(
    @IReserveStore private readonly reserveStore: IReserveStore,
    private readonly currencyValueConverter: CurrencyValueConverter,
    @I18N private readonly i18n: I18N,
  ) {}

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
  get tooltipOptions(): _DeepPartialObject<TooltipOptions> {
    return {
      callbacks: {
        title: (x) => this.i18n.tr('timestamp', { date: new Date(x[0].label) }),
        label: (x) => (x.dataset.label ? `${x.dataset.label}: ${this.currencyValueConverter.toView(`${x.raw as string}`)}` : ''),
      },
    };
  }
  get yLabelFormat(): Record<string, unknown> {
    return {
      callback: (value: number) => this.currencyValueConverter.toView(value.toString()),
    };
  }
  get xLabelFormat(): Record<string, unknown> {
    return getXLabelFormat(this.currentInterval, this.i18n);
  }
  //TODO: Make i18n work in this method as a getter
  private dataSets(valueData: number[], baseLineData: number[]) {
    return [
      {
        data: baseLineData,
        borderDash: [5],
        borderColor: 'rgba(190, 183, 183, 0.77)',
        tension: 0.5,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
        backgroundColor: 'rgba(75, 192, 192, .7)',
      },
      {
        label: this.i18n.tr('navigation.reserve.k-guilder.value-ratio.chart-tooltip'),
        data: valueData,
        fill: true,
        borderColor: 'rgba(69, 173, 168, 0.77)',
        tension: 0.5,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
        backgroundColor: 'rgba(75, 192, 192, .7)',
      },
    ];
  }
}
