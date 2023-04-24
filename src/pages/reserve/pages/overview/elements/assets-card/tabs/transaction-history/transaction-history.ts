import { customElement, ICustomElementViewModel } from 'aurelia';

import { IGridColumn } from '../../../../../../../../design-system/elements/k-data-grid/grid-column';
import { transactionHistoryColumns } from '../../../../../../../../grid-columns';
import { Transaction } from '../../../../../../../../models/transaction';
import { IReserveStore } from '../../../../../../../../stores/reserve-store';

import template from './transaction-history.html';

import './transaction-history.scss';

@customElement({ name: 'transaction-history', template })
export class TransactionHistory implements ICustomElementViewModel {
  columns: IGridColumn[] = [];
  data: Transaction[] = [];
  constructor(@IReserveStore private readonly reserveStore: IReserveStore) {
    this.columns = transactionHistoryColumns();
  }
  attaching(): void | Promise<void> {
    this.data = this.reserveStore.transactions;
  }
}
