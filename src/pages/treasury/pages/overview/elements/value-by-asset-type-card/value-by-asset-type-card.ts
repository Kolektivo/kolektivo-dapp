import './value-by-asset-type-card.scss';
import { AssetType } from './../../../../../../models/asset';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { ITreasuryStore } from './../../../../../../stores/treasury-store';
import template from './value-by-asset-type-card.html';

@customElement({ name: 'value-by-asset-type-card', template })
export class ValueByAssetTypeCard implements ICustomElementViewModel {
  constructor(@ITreasuryStore private readonly treasuryStore: ITreasuryStore) {}

  get chartData(): number[] {
    return [this.nonStablecoinAssetPercentage * 100, this.stablecoinAssetPercentage * 100, this.ecologicalAssetPercentage * 100];
  }

  get ecologicalAssetPercentage(): number {
    return this.getAssetPercentage(AssetType.Ecological) / this.treasuryStore.treasuryValue;
  }

  get stablecoinAssetPercentage(): number {
    return this.getAssetPercentage(AssetType.Stablecoin) / this.treasuryStore.treasuryValue;
  }

  get nonStablecoinAssetPercentage(): number {
    return this.getAssetPercentage(AssetType.NonStablecoin) / this.treasuryStore.treasuryValue;
  }

  private getAssetPercentage(type: AssetType): number {
    return (
      this.treasuryStore.treasuryAssets
        ?.filter((x) => x?.type === type)
        .map((x) => x?.total ?? 0)
        .sum() ?? 0
    );
  }
}
