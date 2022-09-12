import './value-over-time-card.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { ITreasuryStore } from 'stores';
import template from './value-over-time-card.html';

const formatter = new Intl.DateTimeFormat(undefined, {
  timeStyle: 'short',
  dateStyle: 'short',
});

@customElement({ name: 'value-over-time-card', template })
export class ValueOverTimeCard implements ICustomElementViewModel {
  constructor(@ITreasuryStore private readonly treasuryStore: ITreasuryStore) {}
  currentFilter = '1d';
  getButtonType(value: string, current: string) {
    return current === value ? 'primary' : 'secondary';
  }
  get labels() {
    return this.treasuryStore.valueOverTime?.map((x) => formatter.format(x.date).replace(',', ''));
  }
  get data(): number[] {
    return this.treasuryStore.valueOverTime?.map((x) => x.value) ?? [0];
  }
  get lastRebaseTime(): Date {
    if (!this.treasuryStore.valueOverTime?.length) return new Date();
    return this.treasuryStore.valueOverTime[0].date;
  }
}
