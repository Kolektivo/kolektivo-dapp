import './value-over-time-card.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IReserveStore } from 'stores/reserve-store';
import { Interval } from 'models/interval';
import { ValueChartData } from 'models/chart-data';
import { formatter } from 'utils';
import { watch } from '@aurelia/runtime-html';
import template from './value-over-time-card.html';
@customElement({ name: 'value-over-time-card', template })
export class ValueOverTimeCard implements ICustomElementViewModel {
  public loading = false;
  private currentInterval: Interval = Interval['1d'];
  private reserveData: ValueChartData[] = [];
  constructor(@IReserveStore private readonly reserveStore: IReserveStore) {}

  async binding(): Promise<void> {
    this.reserveData = await this.reserveStore.getReserveValueOverTime(this.currentInterval);
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
  get labels() {
    return this.reserveData.map((x) => formatter.format(x.createdAt).replace(',', ''));
  }
  get data(): number[] {
    return this.reserveData.map((x) => x.value);
  }
  get dataSets() {
    return [
      {
        label: 'Reserve Value',
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
