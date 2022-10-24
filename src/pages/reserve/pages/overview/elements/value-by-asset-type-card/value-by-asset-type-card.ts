import './value-by-asset-type-card.scss';
import { AssetType } from 'models/asset';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IReserveStore } from 'stores/reserve-store';
import template from './value-by-asset-type-card.html';

@customElement({ name: 'value-by-asset-type-card', template })
export class ValueByAssetTypeCard implements ICustomElementViewModel {
  constructor(@IReserveStore private readonly reserveStore: IReserveStore) {}

  get chartData(): number[] {
    return [this.nonStablecoinAssetPercentage() * 100, this.stablecoinAssetPercentage() * 100, this.ecologicalAssetPercentage() * 100];
  }

  readonly isReady = true;

  ecologicalAssetPercentage(): number {
    return this.getAssetPercentage(AssetType.Ecological) / this.reserveStore.reserveValue;
  }

  stablecoinAssetPercentage(): number {
    return this.getAssetPercentage(AssetType.Stablecoin) / this.reserveStore.reserveValue;
  }

  nonStablecoinAssetPercentage(): number {
    return this.getAssetPercentage(AssetType.NonStablecoin) / this.reserveStore.reserveValue;
  }

  
  private getAssetPercentage(type: AssetType): number {
    return (
      this.reserveStore.reserveAssets
        ?.filter((x) => x?.type === type)
        .map((x) => x?.total ?? 0)
        .sum() ?? 0
    );
  }
}
