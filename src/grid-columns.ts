import { I18N } from '@aurelia/i18n';
import { IGridColumn } from './design-system/elements/k-data-grid/grid-column';
import { appContainer } from 'app-container';

export const assetsColumns = () => {
  const i18n = appContainer.get(I18N);
  return [
    {
      headerText: i18n.tr('general.assets.grid-headers.token'),
      field: 'token',
      width: '1fr',
      template: '<avatar-text name.bind="token.name" src.bind="token.logoURI"></avatar-text>',
    },
    {
      headerText: i18n.tr('general.assets.grid-headers.price'),
      field: 'price',
      width: '1fr',
      template: '<span>${token.price | currency}</span>',
    },
    {
      headerText: i18n.tr('general.assets.grid-headers.quantity'),
      field: 'quantity',
      width: '1fr',
      template: '<formatted-number show-tooltip commas value="${quantity | ethwei}">',
    },
    {
      headerText: i18n.tr('general.assets.grid-headers.total'),
      field: 'totalValue',
      width: '1fr',
      template: '<span>${total | currency}</span>',
    },
  ] as IGridColumn[];
};

export const transactionHistoryColumns = () => {
  const i18n = appContainer.get(I18N);
  return [
    {
      headerText: i18n.tr('general.transaction-history.grid-headers.token'),
      field: 'token',
      width: '1fr',
      template: '<avatar-text name.bind="token.name" src.bind="token.logoURI"></avatar-text>',
    },
    { headerText: i18n.tr('general.transaction-history.grid-headers.type'), field: 'type', width: '1fr' },
    {
      headerText: i18n.tr('general.transaction-history.grid-headers.amount'),
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
      headerText: i18n.tr('general.transaction-history.grid-headers.address'),
      field: 'address',
      width: '1fr',
      template: '<user-address address.bind="address"></user-address>',
    },
    {
      headerText: i18n.tr('general.transaction-history.grid-headers.age'),
      field: 'date',
      width: '1fr',
      template: '<span>${date * 1000 | relativeTime}</span>',
    },
  ] as IGridColumn[];
};
