import { I18N } from '@aurelia/i18n';
import { customElement, ICustomElementViewModel, watch } from '@aurelia/runtime-html';

import { RiskChartData } from '../../../../../../models/chart-data';
import { Interval } from '../../../../../../models/interval';
import { IReserveStore } from '../../../../../../stores/reserve-store';
import { formatter, getXLabelFormat } from '../../../../../../utils';

import { CurrencyValueConverter } from './../../../../../../design-system/value-converters/currency';
import template from './value-over-time-card.html';

import type { TooltipOptions } from 'chart.js';

@customElement({ name: 'value-over-time-card', template })
export class ValueOverTimeCard implements ICustomElementViewModel {
  public loading = false;
  private currentInterval: Interval = Interval['1d'];
  private riskData: RiskChartData[] = [];

  constructor(@IReserveStore private readonly reserveStore: IReserveStore, @I18N private readonly i18n: I18N, private readonly currencyValueConverter?: CurrencyValueConverter) {}

  binding() {
    void this.intervalChanged();
  }

  @watch('currentInterval')
  async intervalChanged(): Promise<void> {
    this.loading = true;
    this.riskData = await this.reserveStore.getRiskOverTime(this.currentInterval);
    this.loading = false;
  }
  getButtonType(value: string, current: string) {
    return current === value ? 'primary' : 'secondary';
  }
  get labels() {
    return this.riskData.map((x) => formatter.format(x.createdAt).replace(',', ''));
  }
  get minCollateralValue(): number[] {
    return this.riskData.map((x) => x.minCollateralValue);
  }
  get marketCap(): number[] {
    return this.riskData.map((x) => x.marketCap);
  }
  get lowRisk(): number[] {
    return this.riskData.map((x) => x.lowRisk);
  }
  get moderateRisk(): number[] {
    return this.riskData.map((x) => x.moderateRisk + x.lowRisk);
  }
  get highRisk(): number[] {
    return this.riskData.map((x) => x.highRisk + x.moderateRisk + x.lowRisk);
  }
  get alertText(): string {
    if (!this.reserveStore.kCurMarketCap || !this.reserveStore.reserveValue || this.reserveStore.reserveValue.eq(this.reserveStore.kCurMarketCap)) return '';
    return this.i18n.tr(
      this.reserveStore.reserveValue.lt(this.reserveStore.kCurMarketCap)
        ? 'navigation.reserve.risk.value-over-time.under-collateralized'
        : 'navigation.reserve.risk.value-over-time.over-collateralized',
    );
  }
  get tooltipOptions() {
    return {
      itemSort: (a, b, data) => b.datasetIndex - a.datasetIndex,
      callbacks: {
        title: (x) => this.i18n.tr('timestamp', { date: new Date(x[0].label) }),
        label: (x) => {
          let value = Number(x.raw);
          if (x.datasetIndex > 2) {
            value -= Number(x.chart.data.datasets[x.datasetIndex - 1].data[x.dataIndex]);
          } else if (x.datasetIndex > 3) {
            value -= Number(x.chart.data.datasets[x.datasetIndex - 2].data[x.dataIndex]);
          }
          return `${x.dataset.label ?? ''}: ${this.currencyValueConverter?.toView(value.toString())}`;
        },
        labelColor: (context) => {
          return {
            backgroundColor: context.dataset.pointBorderColor,
            borderColor: context.dataset.pointBorderColor,
          };
        },
        labelPointStyle: (context) => {
          return {
            pointStyle:
              context.dataset.label === this.i18n.tr('navigation.reserve.risk.value-over-time.market-cap') ||
              context.dataset.label === this.i18n.tr('navigation.reserve.risk.value-over-time.min-value')
                ? 'dash'
                : 'circle',
          };
        },
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
  private dataSets(marketCap: number[], minCollateralValue: number[], lowRisk: number[], moderateRisk: number[], highRisk: number[]) {
    return [
      {
        label: this.i18n.tr('navigation.reserve.risk.value-over-time.market-cap'),
        data: marketCap,
        borderDash: [5],
        borderColor: 'rgba(190, 183, 183)',
        tension: 0,
        pointRadius: 0,
        pointBorderColor: 'rgb(190, 183, 183)',
        pointBackgroundColor: '#FFFFFF',
      },
      {
        label: this.i18n.tr('navigation.reserve.risk.value-over-time.min-value'),
        data: minCollateralValue,
        borderDash: [5],
        borderColor: 'rgba(213, 92, 56)',
        tension: 0,
        pointRadius: 0,
        pointBorderColor: 'rgb(213, 92, 56)',
        pointBackgroundColor: '#FFFFFF',
      },
      {
        label: this.i18n.tr('navigation.reserve.risk.value-over-time.low-risk'),
        data: lowRisk,
        fill: true,
        backgroundColor: 'rgb(42 166 161)',
        tension: 0,
        pointRadius: 0,
        pointBorderColor: 'rgb(42 166 161)',
        pointBackgroundColor: '#FFFFFF',
      },
      {
        label: this.i18n.tr('navigation.reserve.risk.value-over-time.moderate-risk'),
        data: moderateRisk,
        fill: true,
        backgroundColor: 'rgb(245, 161, 74)',
        tension: 0,
        pointRadius: 0,
        pointBorderColor: 'rgb(245, 161, 74)',
        pointBackgroundColor: '#FFFFFF',
      },
      {
        label: this.i18n.tr('navigation.reserve.risk.value-over-time.high-risk'),
        data: highRisk,
        fill: true,
        backgroundColor: 'rgb(213, 92, 56)',
        tension: 0,
        pointRadius: 0,
        pointBorderColor: 'rgb(213, 92, 56)',
        pointBackgroundColor: '#FFFFFF',
      },
    ];
  }
}
