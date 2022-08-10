import './assets.scss';
import { I18N } from '@aurelia/i18n';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IGridColumn } from '../../../../../../../../../design-system/elements/k-data-grid/grid-column';
import template from './assets.html';

@customElement({ name: 'assets', template })
export class Assets implements ICustomElementViewModel {
  testColumns: IGridColumn[] = [];
  constructor(@I18N private readonly i18n: I18N) {
    this.testColumns = [
      { headerText: this.i18n.tr('navigation.treasury.overview.assets.assets-tab.grid-headers.token'), field: 'token', width: '1fr' },
      { headerText: this.i18n.tr('navigation.treasury.overview.assets.assets-tab.grid-headers.price'), field: 'price', width: '1fr' },
      { headerText: this.i18n.tr('navigation.treasury.overview.assets.assets-tab.grid-headers.quantity'), field: 'quantity', width: '1fr' },
      { headerText: this.i18n.tr('navigation.treasury.overview.assets.assets-tab.grid-headers.total'), field: 'totalValue', width: '1fr' },
    ];
  }

  testData = [
    { token: 'XXX', price: '$$$', quantity: 400, totalValue: '$$$' },
    { token: 'XXX', price: '$$$', quantity: 400, totalValue: '$$$' },
    { token: 'XXX', price: '$$$', quantity: 400, totalValue: '$$$' },
    { token: 'XXX', price: '$$$', quantity: 400, totalValue: '$$$' },
    { token: 'XXX', price: '$$$', quantity: 400, totalValue: '$$$' },
    { token: 'XXX', price: '$$$', quantity: 400, totalValue: '$$$' },
    { token: 'XXX', price: '$$$', quantity: 400, totalValue: '$$$' },
    { token: 'XXX', price: '$$$', quantity: 400, totalValue: '$$$' },
  ];
}
