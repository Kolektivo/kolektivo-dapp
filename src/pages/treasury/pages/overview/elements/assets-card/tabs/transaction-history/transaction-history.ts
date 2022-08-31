import './transaction-history.scss';
import { I18N } from '@aurelia/i18n';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IGridColumn } from '../../../../../../../../design-system/elements/k-data-grid/grid-column';
import { ITreasuryStore } from 'stores';
import { Transaction } from 'models/transaction';
import template from './transaction-history.html';

@customElement({ name: 'transaction-history', template })
export class TransactionHistory implements ICustomElementViewModel {
  columns: IGridColumn[] = [];
  data: Transaction[] = [];
  constructor(@I18N private readonly i18n: I18N, @ITreasuryStore private readonly treauryStore: ITreasuryStore) {
    this.columns = [
      {
        headerText: this.i18n.tr('navigation.treasury.overview.assets.transaction-history.grid-headers.token'),
        field: 'token',
        width: '1fr',
        template: '<avatar-text name.bind="token.name" src.bind="token.logoURI"></avatar-text>',
      },
      { headerText: this.i18n.tr('navigation.treasury.overview.assets.transaction-history.grid-headers.type'), field: 'type', width: '1fr' },
      {
        headerText: this.i18n.tr('navigation.treasury.overview.assets.transaction-history.grid-headers.amount'),
        field: 'amount',
        width: '1fr',
        template: '<formatted-number show-tooltip value="${amount | ethwei}"></formatted-number>',
      },
      {
        headerText: 'TxId',
        field: 'id',
        width: '1fr',
        template: '<user-address address.bind="id" is-transaction></user-address>',
      },
      {
        headerText: this.i18n.tr('navigation.treasury.overview.assets.transaction-history.grid-headers.address'),
        field: 'address',
        width: '1fr',
        template: '<user-address address.bind="address"></user-address>',
      },
      {
        headerText: this.i18n.tr('navigation.treasury.overview.assets.transaction-history.grid-headers.age'),
        field: 'date',
        width: '1fr',
        template: '<span>${date * 1000 | relativeTime}</span>',
      },
    ];
    this.data = this.treauryStore.transactions;
  }
}
