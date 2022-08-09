import './activity-menu.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IState } from '../../../../src/state';

import template from './activity-menu.html';

@customElement({
  name: 'activity-menu',
  template,
  capture: true,
})
export class ActivityMenu implements ICustomElementViewModel {
  constructor(@IState private readonly state: IState) {}

  get orderedTransactions(): Transaction[] {
    return this.state.blockChainState.transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
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
