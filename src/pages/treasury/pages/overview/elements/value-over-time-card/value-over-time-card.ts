import { customElement, ICustomElementViewModel } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { watch } from '@aurelia/runtime-html';

import { ValueChartData } from '../../../../../../models/chart-data';
import { Interval } from '../../../../../../models/interval';
import { ITreasuryStore } from '../../../../../../stores';
import { getXLabelFormat } from '../../../../../../utils';

import { ICurrency } from './../../../../../../design-system/value-converters/currency';
import template from './value-over-time-card.html';

import './value-over-time-card.scss';

import type { TooltipOptions } from 'chart.js';

@customElement({ name: 'value-over-time-card', template })
export class ValueOverTimeCard implements ICustomElementViewModel {
  public loading = false;
  private currentInterval: Interval = Interval['1d'];
  private treasuryData: ValueChartData[] = [];
  constructor(@ITreasuryStore private readonly treasuryStore: ITreasuryStore, @I18N private readonly i18n: I18N, @ICurrency private readonly currencyValueConverter?: ICurrency) {}

  binding() {
    void this.intervalChanged();
    void this.treasuryStore.getLastRebaseTime();
  }

  @watch('currentInterval')
  async intervalChanged(): Promise<void> {
    this.loading = true;
    this.treasuryData = await this.treasuryStore.getValueOverTime(this.currentInterval);
    this.loading = false;
  }
  getButtonType(value: string, current: string) {
    return current === value ? 'primary' : 'secondary';
  }
  get labels() {
    return this.treasuryData.map((x) => x.createdAt);
  }
  get data(): number[] {
    return this.treasuryData.map((x) => x.value);
  }
  get lastRebaseTime(): Date {
    return this.treasuryStore.lastRebaseTime ?? new Date();
  }
  get tooltipOptions() {
    return {
      callbacks: {
        title: (x: { label: string }[]) => this.i18n.tr('timestamp', { date: new Date(Number(x[0].label)) }),
        label: (x: { dataset: { label?: string }; raw: string }) => `${x.dataset.label ?? ''}: ${this.currencyValueConverter?.toView(`${x.raw}`) ?? ''}`,
        labelColor: (context) => {
          return {
            backgroundColor: context.dataset.borderColor,
            borderColor: context.dataset.borderColor,
          };
        },
      } as Partial<TooltipOptions['callbacks']>,
    } as Partial<TooltipOptions>;
  }
  get yLabelFormat(): Record<string, unknown> {
    return {
      callback: (value: number) => `$${Number(value).toFixed(2)}`,
    };
  }
  get xLabelFormat(): Record<string, unknown> {
    return getXLabelFormat(this.currentInterval, this.i18n);
  }
  //TODO: Make i18n work in this method as a getter
  private dataSets(data: number[]) {
    return [
      {
        label: this.i18n.tr('navigation.treasury.overview.value-over-time.chart-tooltip'),
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
