import './transaction-history.scss';
import { I18N } from '@aurelia/i18n';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IGridColumn } from '../../../../../../../../../design-system/elements/k-data-grid/grid-column';
import template from './transaction-history.html';

@customElement({ name: 'transaction-history', template })
export class TransactionHistory implements ICustomElementViewModel {
  columns: IGridColumn[] = [];
  constructor(@I18N private readonly i18n: I18N) {
    this.columns = [
      { headerText: this.i18n.tr('navigation.treasury.overview.assets.transaction-history.grid-headers.token'), field: 'token', width: '1fr' },
      { headerText: this.i18n.tr('navigation.treasury.overview.assets.transaction-history.grid-headers.type'), field: 'type', width: '1fr' },
      { headerText: this.i18n.tr('navigation.treasury.overview.assets.transaction-history.grid-headers.amount'), field: 'amount', width: '1fr' },
      {
        headerText: this.i18n.tr('navigation.treasury.overview.assets.transaction-history.grid-headers.address'),
        field: 'address',
        width: '1fr',
        template: '<user-address address.bind="address"></user-address>',
      },
      { headerText: this.i18n.tr('navigation.treasury.overview.assets.transaction-history.grid-headers.age'), field: 'age', width: '1fr' },
    ];
  }

  data = [
    { token: 'XXX', type: 'deposit', amount: 400, address: '0x546EeA6110Cf2E5B0284D43236E48835973b2776', age: '1hr ago' },
    { token: 'XXX', type: 'deposit', amount: 400, address: '0x546EeA6110Cf2E5B0284D43236E48835973b2776', age: '1hr ago' },
    { token: 'XXX', type: 'deposit', amount: 400, address: '0x546EeA6110Cf2E5B0284D43236E48835973b2776', age: '1hr ago' },
    { token: 'XXX', type: 'deposit', amount: 400, address: '0x546EeA6110Cf2E5B0284D43236E48835973b2776', age: '1hr ago' },
    { token: 'XXX', type: 'deposit', amount: 400, address: '0x546EeA6110Cf2E5B0284D43236E48835973b2776', age: '1hr ago' },
    { token: 'XXX', type: 'deposit', amount: 400, address: '0x546EeA6110Cf2E5B0284D43236E48835973b2776', age: '1hr ago' },
    { token: 'XXX', type: 'deposit', amount: 400, address: '0x546EeA6110Cf2E5B0284D43236E48835973b2776', age: '1hr ago' },
    { token: 'XXX', type: 'deposit', amount: 400, address: '0x546EeA6110Cf2E5B0284D43236E48835973b2776', age: '1hr ago' },
    { token: 'XXX', type: 'deposit', amount: 400, address: '0x546EeA6110Cf2E5B0284D43236E48835973b2776', age: '1hr ago' },
    { token: 'XXX', type: 'deposit', amount: 400, address: '0x546EeA6110Cf2E5B0284D43236E48835973b2776', age: '1hr ago' },
  ];
}
