import { customElement, ICustomElementViewModel } from 'aurelia';

import { IGridColumn } from '../../../../../../../../design-system/elements/k-data-grid/grid-column';
import { transactionHistoryColumns } from '../../../../../../../../grid-columns';
import { ITreasuryStore } from '../../../../../../../../stores';

import template from './transaction-history.html';

import './transaction-history.scss';

import { Transaction } from 'ethers';

@customElement({ name: 'transaction-history', template })
export class TransactionHistory implements ICustomElementViewModel {
  columns: IGridColumn[] = [];
  data: Transaction[] = [];
  constructor(@ITreasuryStore private readonly treauryStore: ITreasuryStore) {
    this.columns = transactionHistoryColumns();
    this.data = this.treauryStore.transactions;
  }
}
