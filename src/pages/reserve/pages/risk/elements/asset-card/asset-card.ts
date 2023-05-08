import { I18N } from '@aurelia/i18n';
import { customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import { IGridColumn } from '../../../../../../design-system/elements/k-data-grid/grid-column';
import { riskAssetsColumns } from '../../../../../../grid-columns';
import { AssetType } from '../../../../../../models/asset';
import { INumberService } from '../../../../../../services';
import { IReserveStore } from '../../../../../../stores/reserve-store';
import { fromWei } from '../../../../../../utils';

import template from './asset-card.html';

@customElement({ name: 'asset-card', template })
export class AssetCard implements ICustomElementViewModel {
  columns: IGridColumn[] = [];
  constructor(@IReserveStore private readonly reserveStore: IReserveStore, @INumberService private readonly numberService: INumberService, @I18N private readonly i18n: I18N) {
    this.columns = riskAssetsColumns();
  }
  get data() {
    return this.reserveStore.reserveAssets
      ?.map((asset) => {
        return {
          token: asset.token.name,
          tokenIcon: asset.token.logoURI,
          riskClass: asset.type === AssetType.Low ? 'Low Risk' : asset.type === AssetType.Medium ? 'Medium Risk' : 'High Risk',
          collateralValue: asset.total,
          percentOfReserve: asset.total / this.numberService.fromString(fromWei(this.reserveStore.reserveValue ?? 0, 18)),
        };
      })
      .sort((a, b) => a.percentOfReserve - b.percentOfReserve);
  }
}
