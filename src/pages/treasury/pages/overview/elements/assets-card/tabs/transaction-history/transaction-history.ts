import { customElement, ICustomElementViewModel } from 'aurelia';

import { IGridColumn } from '../../../../../../../../design-system/elements/k-data-grid/grid-column';
import { transactionHistoryColumns } from '../../../../../../../../grid-columns';
import { Transaction } from '../../../../../../../../models/transaction';
import { ITreasuryStore } from '../../../../../../../../stores';

import template from './transaction-history.html';

import './transaction-history.scss';

@customElement({ name: 'transaction-history', template })
export class TransactionHistory implements ICustomElementViewModel {
  columns: IGridColumn[] = [];
  data: Transaction[] = [];
  constructor(@ITreasuryStore private readonly treauryStore: ITreasuryStore) {
    this.columns = transactionHistoryColumns();
    this.data = this.treauryStore.transactions;
  }
}
