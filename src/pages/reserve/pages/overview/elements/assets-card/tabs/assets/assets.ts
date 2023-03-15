import { customElement, ICustomElementViewModel } from 'aurelia';

import { IGridColumn } from '../../../../../../../../design-system/elements/k-data-grid/grid-column';
import { assetsColumns } from '../../../../../../../../grid-columns';
import { IReserveStore } from '../../../../../../../../stores/reserve-store';

import template from './assets.html';

import './assets.scss';

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
