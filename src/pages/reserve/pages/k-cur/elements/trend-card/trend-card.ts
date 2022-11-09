import { CurrencyValueConverter } from 'design-system/value-converters';

import { I18N } from '@aurelia/i18n';
import { ICustomElementViewModel, customElement, watch } from '@aurelia/runtime-html';
import { IReserveStore } from 'stores/reserve-store';
import { Interval } from 'models/interval';
import { formatter, getXLabelFormat } from 'utils';
import { kCurPriceData } from 'models/chart-data';
import template from './trend-card.html';
import type { TooltipOptions } from 'chart.js';
import type { _DeepPartialObject } from 'chart.js/types/utils';

@customElement({ name: 'trend-card', template })
export class TrendCard implements ICustomElementViewModel {
  public loading = false;
  private currentInterval: Interval = Interval['1d'];
  private kCurPriceData: kCurPriceData[] = [];
  constructor(
    @IReserveStore private readonly reserveStore: IReserveStore,
    @I18N private readonly i18n: I18N,
    private readonly currencyValueConverter: CurrencyValueConverter,
  ) {}

  binding() {
    void this.intervalChanged();
  }

  @watch('currentInterval')
  async intervalChanged(): Promise<void> {
    this.loading = true;
    this.kCurPriceData = await this.reserveStore.getkCurPriceOverTime(this.currentInterval);
    this.loading = false;
  }
  getButtonType(value: string, current: string) {
    return current === value ? 'primary' : 'secondary';
  }
  get labels() {
    return this.kCurPriceData.map((x) => formatter.format(x.createdAt).replace(',', ''));
  }
  get price(): number[] {
    return this.kCurPriceData.map((x) => x.kCurPrice);
  }
  get priceCeiling(): number[] {
    return this.kCurPriceData.map((x) => x.kCurPriceCeiling);
  }
  get priceFloor(): number[] {
    return this.kCurPriceData.map((x) => x.kCurPriceFloor);
  }
  get tooltipOptions(): _DeepPartialObject<TooltipOptions> {
    return {
      callbacks: {
        title: (x) => this.i18n.tr('timestamp', { date: new Date(x[0].label) }),
        label: (x) => {
          return `${x.dataset.label ?? ''}: ${this.currencyValueConverter.toView(Number(x.raw).toString())}`;
        },
      },
    };
  }
  get yLabelFormat(): Record<string, unknown> {
    return {
      callback: (value: number) => `$${Number(value).toFixed(2)}`,
    };
  }
  get xLabelFormat(): Record<string, unknown> {
    return getXLabelFormat(this.currentInterval, this.i18n);
  }
  private dataSets(priceCeiling: number[], priceFloor: number[], price: number[]) {
    return [
      {
        label: 'Price Celing',
        data: priceCeiling,
        borderDash: [5],
        borderColor: 'rgba(190, 183, 183, 0.77)',
        tension: 0.5,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
        backgroundColor: 'rgba(75, 192, 192, .7)',
      },
      {
        label: 'Price Floor',
        data: priceFloor,
        borderDash: [5],
        borderColor: 'rgba(190, 183, 183, 0.77)',
        tension: 0.5,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
        backgroundColor: 'rgba(75, 192, 192, .7)',
      },
      {
        label: 'kCur Price',
        data: price,
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
