import './overview.scss';
import { ICustomElementViewModel } from 'aurelia';
import { IGridColumn } from './../../../../../design-system/elements/k-data-grid/grid-column';

export class Overview implements ICustomElementViewModel {
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
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
