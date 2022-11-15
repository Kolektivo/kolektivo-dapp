import { I18N } from '@aurelia/i18n';
import { customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import { IGridColumn } from '../../../../../../design-system/elements/k-data-grid/grid-column';

import template from './asset-card.html';

import { riskAssetsColumns } from 'grid-columns';
import { INumberService } from 'services/number-service';
import { IReserveStore } from 'stores/reserve-store';
import { fromWei } from 'utils';

@customElement({ name: 'asset-card', template })
export class AssetCard implements ICustomElementViewModel {
  columns: IGridColumn[] = [];
  constructor(
    @IReserveStore private readonly reserveStore: IReserveStore,
    @INumberService private readonly numberService: INumberService,
    @I18N private readonly i18n: I18N,
  ) {
    this.columns = riskAssetsColumns();
  }
  get data() {
    return this.reserveStore.reserveAssets
      ?.map((asset) => {
        return {
          token: asset.token.name,
          tokenIcon: asset.token.logoURI,
          riskClass: typeof asset.type !== 'undefined' ? this.reserveStore.getRiskClass(asset.type) : '',
          collateralValue: asset.total,
          percentOfReserve: asset.total / this.numberService.fromString(fromWei(this.reserveStore.reserveValue ?? 0, 18)),
        };
      })
      .sort((a, b) => a.percentOfReserve - b.percentOfReserve);
  }
}
