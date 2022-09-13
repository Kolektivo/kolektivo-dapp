import './assets.scss';
import { I18N } from '@aurelia/i18n';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IGridColumn } from '../../../../../../../../design-system/elements/k-data-grid/grid-column';
import { IReserveStore } from 'stores/reserve-store';
import template from './assets.html';

@customElement({ name: 'assets', template })
export class Assets implements ICustomElementViewModel {
  columns: IGridColumn[] = [];
  constructor(@I18N private readonly i18n: I18N, @IReserveStore private readonly reserveStore: IReserveStore) {
    this.columns = [
      {
        headerText: this.i18n.tr('navigation.reserve.overview.assets.assets-tab.grid-headers.token'),
        field: 'token',
        width: '1fr',
        template: '<avatar-text name.bind="token.name" src.bind="token.logoURI"></avatar-text>',
      },
      {
        headerText: this.i18n.tr('navigation.reserve.overview.assets.assets-tab.grid-headers.price'),
        field: 'price',
        width: '1fr',
        template: '<span>${token.price | currency}</span>',
      },
      {
        headerText: this.i18n.tr('navigation.reserve.overview.assets.assets-tab.grid-headers.quantity'),
        field: 'quantity',
        width: '1fr',
        template: '<formatted-number show-tooltip commas value="${quantity | ethwei}">',
      },
      {
        headerText: this.i18n.tr('navigation.reserve.overview.assets.assets-tab.grid-headers.total'),
        field: 'totalValue',
        width: '1fr',
        template: '<span>${total | currency}</span>',
      },
    ];
  }

  get data() {
    return this.reserveStore.reserveAssets;
  }
}
