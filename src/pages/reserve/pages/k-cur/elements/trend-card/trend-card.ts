import { ICustomElementViewModel, customElement, watch } from '@aurelia/runtime-html';
import { IReserveStore } from 'stores/reserve-store';
import { Interval } from 'models/interval';
import { formatter } from 'utils';
import { kCurPriceData } from 'models/chart-data';
import template from './trend-card.html';

@customElement({ name: 'trend-card', template })
export class TrendCard implements ICustomElementViewModel {
  public loading = false;
  private currentInterval: Interval = Interval['1d'];
  private kCurPriceData: kCurPriceData[] = [];
  constructor(@IReserveStore private readonly reserveStore: IReserveStore) {}

  binding() {
    void this.intervalChanged();
  }

  @watch('currentInterval')
  async intervalChanged(): Promise<void> {
    this.loading = true;
    this.kCurPriceData = await this.reserveStore.getkCurPriceOverTime(this.currentInterval);
    this.loading = false;
  }
  getButtonType(value: string, current: string) {
    return current === value ? 'primary' : 'secondary';
  }
  get labels() {
    return this.kCurPriceData.map((x) => formatter.format(x.createdAt).replace(',', ''));
  }
  get price(): number[] {
    return this.kCurPriceData.map((x) => x.kCurPrice);
  }
  get priceCeiling(): number[] {
    return this.kCurPriceData.map((x) => x.kCurPriceCeiling);
  }
  get priceFloor(): number[] {
    return this.kCurPriceData.map((x) => x.kCurPriceFloor);
  }
  get dataSets() {
    return [
      {
        label: 'kCur Price',
        data: this.price,
        fill: true,
        borderColor: 'rgba(69, 173, 168, 0.77)',
        tension: 0.5,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
        backgroundColor: 'rgba(75, 192, 192, .7)',
      },
      {
        label: 'Price Celing',
        data: this.priceCeiling,
        borderDash: [5],
        borderColor: 'rgba(190, 183, 183, 0.77)',
        tension: 0.5,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
        backgroundColor: 'rgba(75, 192, 192, .7)',
      },
      {
        label: 'Price Floor',
        data: this.priceFloor,
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
