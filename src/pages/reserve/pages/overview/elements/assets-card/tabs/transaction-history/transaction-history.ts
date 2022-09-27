import './transaction-history.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IGridColumn } from '../../../../../../../../design-system/elements/k-data-grid/grid-column';
import { IReserveStore } from 'stores/reserve-store';
import { Transaction } from 'models/transaction';
import { transactionHistoryColumns } from 'grid-columns';
import template from './transaction-history.html';

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
