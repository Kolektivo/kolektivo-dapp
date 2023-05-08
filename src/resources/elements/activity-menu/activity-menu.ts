import { customElement, ICustomElementViewModel } from 'aurelia';

import { Transaction } from '../../../stores/kolektivo-store';

import { IStore } from './../../../stores/store';
import template from './activity-menu.html';

import './activity-menu.scss';

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

  get network(): { network: string | null } {
    return { network: this.store.blockChainStore.targetedNetwork };
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
