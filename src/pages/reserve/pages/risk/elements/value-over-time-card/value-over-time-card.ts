import { CurrencyValueConverter } from './../../../../../../design-system/value-converters/currency';
import { I18N } from '@aurelia/i18n';
import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import { IReserveStore } from 'stores/reserve-store';
import { Interval } from 'models/interval';
import { RiskChartData } from 'models/chart-data';
import { formatter, getXLabelFormat } from 'utils';
import template from './value-over-time-card.html';
import type { TooltipOptions } from 'chart.js';
import type { _DeepPartialObject } from 'chart.js/types/utils';

@customElement({ name: 'value-over-time-card', template })
export class ValueOverTimeCard implements ICustomElementViewModel {
  public loading = false;
  private currentInterval: Interval = Interval['1d'];
  private reserveData: RiskChartData[] = [];

  constructor(
    @IReserveStore private readonly reserveStore: IReserveStore,
    @I18N private readonly i18n: I18N,
    private readonly currencyValueConverter: CurrencyValueConverter,
  ) {}

  binding() {
    //void this.intervalChanged();
  }

  // @watch('currentInterval')
  // async intervalChanged(): Promise<void> {
  //   this.loading = true;
  //   this.reserveData = await this.reserveStore.getRiskOverTime(this.currentInterval);
  //   this.loading = false;
  // }
  getButtonType(value: string, current: string) {
    return current === value ? 'primary' : 'secondary';
  }
  get labels() {
    return this.reserveData.map((x) => formatter.format(x.createdAt).replace(',', ''));
  }
  get minCollateralValue(): number[] {
    return this.reserveData.map((x) => x.minCollateralValue);
  }
  get marketCap(): number[] {
    return this.reserveData.map((x) => x.marketCap);
  }
  get lowRisk(): number[] {
    return this.reserveData.map((x) => x.lowRisk);
  }
  get moderateRisk(): number[] {
    return this.reserveData.map((x) => x.moderateRisk);
  }
  get highRisk(): number[] {
    return this.reserveData.map((x) => x.highRisk);
  }
  get tooltipOptions(): _DeepPartialObject<TooltipOptions> {
    return {
      callbacks: {
        label: (x) => {
          if (x.datasetIndex === 0) return '';
          return `${x.dataset.label ?? ''}: ${this.currencyValueConverter.toView(x.raw as string)}`;
        },
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
  get dataSets() {
    return [
      {
        label: this.i18n.tr('navigation.reserve.risk.value-over-time.market-cap'),
        data: [56, 76, 65, 85, 63, 76, 87, 54, 65, 74],
        borderDash: [5],
        borderColor: 'rgba(30, 35, 37, 0.77)',
        tension: 0,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
      },
      {
        label: this.i18n.tr('navigation.reserve.risk.value-over-time.min-value'),
        data: [46, 66, 55, 75, 53, 66, 77, 44, 55, 64],
        borderDash: [5],
        borderColor: 'rgba(220, 77, 77)',
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
