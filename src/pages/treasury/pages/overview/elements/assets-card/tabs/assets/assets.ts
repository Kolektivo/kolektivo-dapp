import './assets.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IGridColumn } from '../../../../../../../../design-system/elements/k-data-grid/grid-column';
import { ITreasuryStore } from './../../../../../../../../stores/treasury-store';
import { assetsColumns } from 'grid-columns';
import template from './assets.html';

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
