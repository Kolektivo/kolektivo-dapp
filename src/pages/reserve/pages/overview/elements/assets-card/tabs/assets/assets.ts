import './assets.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IGridColumn } from '../../../../../../../../design-system/elements/k-data-grid/grid-column';
import { IReserveStore } from 'stores/reserve-store';
import { assetsColumns } from 'grid-columns';
import template from './assets.html';

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
