import './value-over-time-card.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { ITreasuryStore } from 'stores';
import { Interval } from 'models/interval';
import { ValueChartData } from 'models/chart-data';
import { formatter } from 'utils';
import { watch } from '@aurelia/runtime-html';
import template from './value-over-time-card.html';

@customElement({ name: 'value-over-time-card', template })
export class ValueOverTimeCard implements ICustomElementViewModel {
  public loading = false;
  private currentInterval: Interval = Interval['1d'];
  private treasuryData: ValueChartData[] = [];
  constructor(@ITreasuryStore private readonly treasuryStore: ITreasuryStore) {}

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
  get dataSets() {
    return [
      {
        label: 'Treasury Value',
        data: this.data,
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
