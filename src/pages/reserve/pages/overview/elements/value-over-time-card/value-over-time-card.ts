import { customElement, ICustomElementViewModel } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { watch } from '@aurelia/runtime-html';

import { BigNumberOverTimeData } from '../../../../../../models/chart-data';
import { Interval } from '../../../../../../models/interval';
import { INumberService } from '../../../../../../services';
import { IReserveStore } from '../../../../../../stores/reserve-store';
import { fromWei, getXLabelFormat } from '../../../../../../utils';

import { ICurrency } from './../../../../../../design-system/value-converters/currency';
import template from './value-over-time-card.html';

import './value-over-time-card.scss';

import type { TooltipOptions } from 'chart.js';
@customElement({ name: 'value-over-time-card', template })
export class ValueOverTimeCard implements ICustomElementViewModel {
  public loading = false;
  private currentInterval: Interval = Interval['1d'];
  private reserveData: BigNumberOverTimeData[] = [];
  constructor(
    @IReserveStore private readonly reserveStore: IReserveStore,
    @INumberService private readonly numberService: INumberService,
    @I18N private readonly i18n: I18N,
    @ICurrency private readonly currencyValueConverter?: ICurrency,
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

  get tooltipOptions() {
    return {
      callbacks: {
        title: (x) => this.i18n.tr('timestamp', { date: new Date(Number(x[0].label)) }),
        label: (x) => `${x.dataset.label ?? ''}: ${this.currencyValueConverter?.toView(String(x.raw)) ?? ''}`,
        labelColor: (context) => {
          return {
            backgroundColor: context.dataset.borderColor,
            borderColor: context.dataset.borderColor,
          };
        },
      },
    } as TooltipOptions;
  }
  get yLabelFormat(): Record<string, unknown> {
    return {
      callback: (value: number) => `$${Number(value).toFixed(2)}`,
    };
  }
  get xLabelFormat(): Record<string, unknown> {
    return getXLabelFormat(this.currentInterval, this.i18n);
  }
  get labels() {
    return this.reserveData.map((x) => x.createdAt);
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
        tension: 0,
        pointRadius: 0,
        pointBackgroundColor: '#FFFFFF',
        backgroundColor: 'transparent',
      },
    ];
  }
}
