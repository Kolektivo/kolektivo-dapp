import { customElement, ICustomElementViewModel } from 'aurelia';

import { IGridColumn } from '../../../../../../../../design-system/elements/k-data-grid/grid-column';
import { assetsColumns } from '../../../../../../../../grid-columns';

import { ITreasuryStore } from './../../../../../../../../stores/treasury-store';
import template from './assets.html';

import './assets.scss';

@customElement({ name: 'assets', template })
export class Assets implements ICustomElementViewModel {
  columns: IGridColumn[] = [];
  constructor(@ITreasuryStore private readonly treasuryStore: ITreasuryStore) {
    this.columns = assetsColumns();
  }
  get data() {
    return this.treasuryStore.treasuryAssets;
  }
}
