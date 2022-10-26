import './leverage-card.scss';
import { ICustomElementViewModel, customElement, watch } from '@aurelia/runtime-html';
import { IReserveStore } from 'stores/reserve-store';
import { Interval } from 'models/interval';
import { LeverageChartData } from 'models/chart-data';
import { formatter } from 'utils';
import template from './leverage-card.html';
@customElement({ name: 'leverage-card', template })
export class LeverageCard implements ICustomElementViewModel {
  public loading = false;
  private currentInterval: Interval = Interval['1d'];
  private reserveData: LeverageChartData[] = [];
  constructor(@IReserveStore private readonly reserveStore: IReserveStore) {}

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
    return this.reserveData.map((x) => x.leverageRatio);
  }
  get maxLeverageRatioData(): number[] {
    return this.reserveData.map((x) => x.maxLeverageRatio);
  }
  get currentLeverageRatio(): number {
    return this.reserveStore.leverageRatio / 100;
  }
  get maxLeverageRatio(): number {
    return this.reserveStore.maxLeverageRatio / 100;
  }
  get dataSets() {
    return [
      {
        label: 'Leverage Ratio',
        data: this.leverageRatioData,
        fill: true,
        borderColor: 'rgba(69, 173, 168, 0.77)',
        tension: 0.5,
        pointRadius: 0,
        pointBackgroundColor: '#F07C4B',
        backgroundColor: 'rgba(75, 192, 192, .7)',
      },
      {
        label: 'Collateral Celing',
        data: this.maxLeverageRatioData,
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
