import './assets-card.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IGridColumn } from 'design-system/elements/k-data-grid/grid-column';

import template from './assets-card.html';

@customElement({ name: 'assets-card', template })
export class AssetsCard implements ICustomElementViewModel {
  testColumns: IGridColumn[] = [
    { headerText: 'Token', field: 'token', width: '1fr' },
    { headerText: 'Price', field: 'price', width: '1fr' },
    { headerText: 'Quantity', field: 'quantity', width: '1fr' },
    { headerText: 'Total Value', field: 'totalValue', width: '1fr' },
  ];

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
