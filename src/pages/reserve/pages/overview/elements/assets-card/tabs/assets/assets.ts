import { customElement, ICustomElementViewModel } from 'aurelia';

import { IGridColumn } from '../../../../../../../../design-system/elements/k-data-grid/grid-column';

import template from './assets.html';

import './assets.scss';

import { assetsColumns } from 'grid-columns';
import { IReserveStore } from 'stores/reserve-store';

@customElement({ name: 'assets', template })
export class Assets implements ICustomElementViewModel {
  columns: IGridColumn[] = [];
  constructor(@IReserveStore private readonly reserveStore: IReserveStore) {
    this.columns = assetsColumns();
  }

  get data() {
    return this.reserveStore.reserveAssets;
  }
}
