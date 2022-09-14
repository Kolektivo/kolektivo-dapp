import './transaction-history.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IGridColumn } from '../../../../../../../../design-system/elements/k-data-grid/grid-column';
import { ITreasuryStore } from 'stores';
import { Transaction } from 'models/transaction';
import { transactionHistoryColumns } from 'grid-columns';
import template from './transaction-history.html';

@customElement({ name: 'transaction-history', template })
export class TransactionHistory implements ICustomElementViewModel {
  columns: IGridColumn[] = [];
  data: Transaction[] = [];
  constructor(@ITreasuryStore private readonly treauryStore: ITreasuryStore) {
    this.columns = transactionHistoryColumns();
    this.data = this.treauryStore.transactions;
  }
}
