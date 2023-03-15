import { I18N } from '@aurelia/i18n';
import { customElement, ICustomElementViewModel, watch } from '@aurelia/runtime-html';

import { LeverageChartData } from '../../../../../../models/chart-data';
import { Interval } from '../../../../../../models/interval';
import { IReserveStore } from '../../../../../../stores/reserve-store';
import { formatter, getXLabelFormat } from '../../../../../../utils';

import { MultiplierValueConverter } from './../../../../../../resources/value-converters/multiplier';
import template from './leverage-card.html';

import './leverage-card.scss';

import type { TooltipOptions } from 'chart.js';

@customElement({ name: 'leverage-card', template })
export class LeverageCard implements ICustomElementViewModel {
  public loading = false;
  private currentInterval: Interval = Interval['1d'];
  private reserveData: LeverageChartData[] = [];
  constructor(@IReserveStore private readonly reserveStore: IReserveStore, @I18N private readonly i18n: I18N, private readonly multiplierValueConverter?: MultiplierValueConverter) {}

  binding() {
    void this.intervalChanged();
  }

  @watch('currentInterval')
  async intervalChanged(): Promise<void> {
    this.loading = true;
    this.reserveData = await this.reserveStore.getLeverageRatioValueOverTime(this.currentInterval);
    this.loading = false;
  }
  getButtonType(value: string, current: string) {
    return current === value ? 'primary' : 'secondary';
  }
  get labels() {
    return this.reserveData.map((x) => formatter.format(x.createdAt).replace(',', ''));
  }
  get leverageRatioData(): number[] {
    return this.reserveData.map((x) => x.currentLeverageRatio);
  }
  get maxLeverageRatioData(): number[] {
    return this.reserveData.map((x) => x.maxLeverageRatio);
  }
  get referenceLineData(): number[] {
    return this.reserveData.map(() => 100);
  }
  get currentLeverageRatio(): number {
    return this.reserveStore.currentLeverageRatio / 100;
  }
  get maxLeverageRatio(): number {
    return this.reserveStore.maxLeverageRatio / 100;
  }
  get tooltipOptions() {
    return {
      callbacks: {
        title: (x) => this.i18n.tr('timestamp', { date: new Date(x[0].label) }),
        label: (x) => {
          if (x.datasetIndex === 0) return '';
          return `${x.dataset.label ?? ''}: ${this.multiplierValueConverter?.toView(Number(x.raw) / 100) ?? ''}`;
        },
      },
    } as TooltipOptions;
  }
  get yLabelFormat(): Record<string, unknown> {
    return {
      callback: (value: number) => this.multiplierValueConverter?.toView(Number(value) / 100),
    };
  }

  get xLabelFormat(): Record<string, unknown> {
    return getXLabelFormat(this.currentInterval, this.i18n);
  }

  //TODO: Make i18n work in this method as a getter
  private dataSets(referenceLineData: number[], leverageRatioData: number[], maxLeverageRatioData: number[]) {
    return [
      {
        label: '',
        data: referenceLineData,
        borderColor: 'rgba(190, 183, 183, 0.77)',
        tension: 0,
        pointStyle: 'line',
        pointBackgroundColor: 'rgba(190, 183, 183, 0.77)',
        backgroundColor: 'rgba(75, 192, 192, .7)',
      },
      {
        label: this.i18n.tr('navigation.reserve.k-cur.leverage.ratio-text'),
        data: leverageRatioData,
        fill: true,
        borderColor: 'rgba(69, 173, 168, 0.77)',
        tension: 0.5,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
        backgroundColor: 'rgba(75, 192, 192, .7)',
      },
      {
        label: this.i18n.tr('navigation.reserve.k-cur.leverage.max-ratio-text'),
        data: maxLeverageRatioData,
        borderDash: [5],
        borderColor: 'rgba(190, 183, 183, 0.77)',
        tension: 0.5,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
        backgroundColor: 'rgba(75, 192, 192, .7)',
      },
    ];
  }
}
