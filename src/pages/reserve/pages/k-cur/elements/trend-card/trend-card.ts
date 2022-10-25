import { ICustomElementViewModel, customElement, watch } from '@aurelia/runtime-html';
import { IReserveStore } from 'stores/reserve-store';
import { Interval } from 'models/interval';
import { ValueChartData } from 'models/chart-data';
import { formatter } from 'utils';
import template from './trend-card.html';

@customElement({ name: 'trend-card', template })
export class TrendCard implements ICustomElementViewModel {
  public loading = false;
  private currentInterval: Interval = Interval['1d'];
  private reserveData: ValueChartData[] = [];
  constructor(@IReserveStore private readonly reserveStore: IReserveStore) {}

  binding() {
    void this.intervalChanged();
  }

  @watch('currentInterval')
  async intervalChanged(): Promise<void> {
    this.loading = true;
    this.reserveData = await this.reserveStore.getkCurPriceOverTime(this.currentInterval);
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
      {
        label: 'Price Celing',
        data: [4.25, 4.25, 4.25, 4.25, 4.25, 4.25, 4.25, 4.25, 4.25, 4.25, 4.25, 4.25, 4.25, 4.25, 4.25, 4.25, 4.25, 4.25, 4.25, 4.25, 4.25],
        borderDash: [5],
        borderColor: 'rgba(190, 183, 183, 0.77)',
        tension: 0.5,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
        backgroundColor: 'rgba(75, 192, 192, .7)',
      },
      {
        label: 'Price Floor',
        data: [2.32, 2.32, 2.32, 2.32, 2.32, 2.32, 2.32, 2.32, 2.32, 2.32, 2.32, 2.32, 2.32, 2.32, 2.32, 2.32, 2.32, 2.32, 2.32, 2.32, 2.32],
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
