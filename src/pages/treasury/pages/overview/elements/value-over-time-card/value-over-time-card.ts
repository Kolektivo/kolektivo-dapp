import { customElement, ICustomElementViewModel } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { watch } from '@aurelia/runtime-html';

import { CurrencyValueConverter } from './../../../../../../design-system/value-converters/currency';
import template from './value-over-time-card.html';

import './value-over-time-card.scss';

import type { TooltipOptions } from 'chart.js';
import { ValueChartData } from 'models/chart-data';
import { Interval } from 'models/interval';
import { ITreasuryStore } from 'stores';
import { formatter, getXLabelFormat } from 'utils';

@customElement({ name: 'value-over-time-card', template })
export class ValueOverTimeCard implements ICustomElementViewModel {
  public loading = false;
  private currentInterval: Interval = Interval['1d'];
  private treasuryData: ValueChartData[] = [];
  constructor(@ITreasuryStore private readonly treasuryStore: ITreasuryStore, private readonly currencyValueConverter: CurrencyValueConverter, @I18N private readonly i18n: I18N) {}

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
    return this.treasuryData.map((x) => formatter.format(x.createdAt).replace(',', ''));
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
        title: (x: { label: string }[]) => this.i18n.tr('timestamp', { date: new Date(x[0].label) }),
        label: (x: { dataset: { label?: string }; raw: string }) => `${x.dataset.label ?? ''}: ${this.currencyValueConverter.toView(`${x.raw}`)}`,
      },
    } as TooltipOptions;
  }
  get yLabelFormat(): Record<string, unknown> {
    return {
      callback: (value: number) => `$${(Number(value) / 1000000).toFixed(2)}M`,
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
        tension: 0.5,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
        backgroundColor: 'rgba(75, 192, 192, .7)',
      },
    ];
  }
}
