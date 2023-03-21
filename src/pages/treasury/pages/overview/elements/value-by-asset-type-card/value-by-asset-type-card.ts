import { customElement, ICustomElementViewModel } from 'aurelia';

import { AssetType } from './../../../../../../models/asset';
import { Percentage } from './../../../../../../resources/value-converters/percentage';
import { ITreasuryStore } from './../../../../../../stores/treasury-store';
import template from './value-by-asset-type-card.html';

import './value-by-asset-type-card.scss';

import type { TooltipOptions } from 'chart.js';

@customElement({ name: 'value-by-asset-type-card', template })
export class ValueByAssetTypeCard implements ICustomElementViewModel {
  constructor(@ITreasuryStore private readonly treasuryStore: ITreasuryStore, private readonly percentageValueConverter: Percentage) {}

  get chartData(): number[] {
    return [this.nonStablecoinAssetPercentage() * 100, this.stablecoinAssetPercentage() * 100, this.ecologicalAssetPercentage() * 100];
  }

  get isReady() {
    return this.treasuryStore.treasuryValue && this.treasuryStore.treasuryAssets?.length;
  }

  ecologicalAssetPercentage(): number {
    return this.treasuryStore.treasuryValue ? this.getAssetPercentage(AssetType.Ecological) / this.treasuryStore.treasuryValue : 0;
  }

  stablecoinAssetPercentage(): number {
    return this.treasuryStore.treasuryValue ? this.getAssetPercentage(AssetType.Stablecoin) / this.treasuryStore.treasuryValue : 0;
  }

  nonStablecoinAssetPercentage(): number {
    return this.treasuryStore.treasuryValue ? this.getAssetPercentage(AssetType.NonStablecoin) / this.treasuryStore.treasuryValue : 0;
  }

  get tooltipOptions() {
    return {
      backgroundColor: 'rgb(76, 87, 92)',
      callbacks: {
        label: (x) => `${(x.raw as number).toFixed(2)}%`,
      },
    } as TooltipOptions;
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
