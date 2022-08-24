import './activity-menu.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IStore } from './../../../stores/store';
import template from './activity-menu.html';

@customElement({
  name: 'activity-menu',
  template,
  capture: true,
})
export class ActivityMenu implements ICustomElementViewModel {
  constructor(@IStore private readonly store: IStore) {}

  get orderedTransactions(): Transaction[] {
    return this.store.kolektivoStore.transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
  }

  statusText(status: string) {
    switch (status) {
      case 'success':
        return 'Swapped';
      case 'failed':
        return 'Failed to swap';
      case 'pending':
        return 'Swapping';
      default:
        return '';
    }
  }
}
