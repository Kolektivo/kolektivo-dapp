import { ICustomElementViewModel, customElement, watch } from '@aurelia/runtime-html';
import { IReserveStore } from 'stores/reserve-store';
import { Interval } from 'models/interval';
import { ValueChartData } from 'models/chart-data';
import { formatter } from 'utils';
import template from './leverage-card.html';

@customElement({ name: 'leverage-card', template })
export class LeverageCard implements ICustomElementViewModel {
  public loading = false;
  private currentInterval: Interval = Interval['1d'];
  private reserveData: ValueChartData[] = [];
  constructor(@IReserveStore private readonly reserveStore: IReserveStore) {}

  async binding(): Promise<void> {
    this.reserveData = await this.reserveStore.getLeverageRatioValueOverTime(this.currentInterval);
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
  get data(): number[] {
    return this.reserveData.map((x) => x.value);
  }
  get currentLeverageRatio(): number {
    return this.reserveStore.leverageRatio / 100;
  }
  get dataSets() {
    return [
      {
        label: 'Leverage Ratio',
        data: this.data,
        fill: true,
        borderColor: 'rgba(69, 173, 168, 0.77)',
        tension: 0.5,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
        backgroundColor: 'rgba(75, 192, 192, .7)',
      },
      {
        label: 'Collateral Celing',
        data: [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90],
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
