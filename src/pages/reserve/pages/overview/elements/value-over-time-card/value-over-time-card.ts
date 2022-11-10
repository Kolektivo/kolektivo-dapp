import './value-over-time-card.scss';
import { BigNumberOverTimeData } from 'models/chart-data';
import { CurrencyValueConverter } from './../../../../../../design-system/value-converters/currency';
import { I18N } from '@aurelia/i18n';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { INumberService, fromWei } from 'services';
import { IReserveStore } from 'stores/reserve-store';
import { Interval } from 'models/interval';
import { formatter, getXLabelFormat } from 'utils';
import { watch } from '@aurelia/runtime-html';
import template from './value-over-time-card.html';
import type { TooltipOptions } from 'chart.js';
import type { _DeepPartialObject } from 'chart.js/types/utils';
@customElement({ name: 'value-over-time-card', template })
export class ValueOverTimeCard implements ICustomElementViewModel {
  public loading = false;
  private currentInterval: Interval = Interval['1d'];
  private reserveData: BigNumberOverTimeData[] = [];
  constructor(
    @IReserveStore private readonly reserveStore: IReserveStore,
    private readonly currencyValueConverter: CurrencyValueConverter,
    @INumberService private readonly numberService: INumberService,
    @I18N private readonly i18n: I18N,
  ) {}

  binding() {
    void this.intervalChanged();
  }

  @watch('currentInterval')
  async intervalChanged(): Promise<void> {
    this.loading = true;
    this.reserveData = await this.reserveStore.getReserveValueOverTime(this.currentInterval);
    this.loading = false;
  }
  getButtonType(value: string, current: string) {
    return current === value ? 'primary' : 'secondary';
  }

  get tooltipOptions(): _DeepPartialObject<TooltipOptions> {
    return {
      callbacks: {
        title: (x) => this.i18n.tr('timestamp', { date: new Date(x[0].label) }),
        label: (x) => `${x.dataset.label ?? ''}: ${this.currencyValueConverter.toView(`${x.raw as string}`)}`,
      },
    };
  }
  get yLabelFormat(): Record<string, unknown> {
    return {
      callback: (value: number) => `$${(Number(value) / 1000000).toFixed(2)}M`,
    };
  }
  get xLabelFormat(): Record<string, unknown> {
    return getXLabelFormat(this.currentInterval, this.i18n);
  }
  get labels() {
    return this.reserveData.map((x) => formatter.format(x.createdAt).replace(',', ''));
  }
  get data(): number[] {
    return this.reserveData.map((x) => this.numberService.fromString(fromWei(x.value, 18)));
  }
  //TODO: Make i18n work in this method as a getter
  private dataSets(data: number[]) {
    return [
      {
        label: this.i18n.tr('navigation.reserve.overview.value-over-time.chart-tooltip'),
        data: data,
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
