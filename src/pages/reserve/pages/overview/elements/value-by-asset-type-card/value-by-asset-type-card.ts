import { customElement, ICustomElementViewModel } from 'aurelia';

import { AssetType } from '../../../../../../models/asset';
import { INumberService } from '../../../../../../services';
import { IReserveStore } from '../../../../../../stores/reserve-store';
import { fromWei } from '../../../../../../utils';

import template from './value-by-asset-type-card.html';

import './value-by-asset-type-card.scss';

import type { TooltipOptions } from 'chart.js';

@customElement({ name: 'value-by-asset-type-card', template })
export class ValueByAssetTypeCard implements ICustomElementViewModel {
  constructor(@IReserveStore private readonly reserveStore: IReserveStore, @INumberService private readonly numberService: INumberService) {}

  get chartData(): number[] {
    return [this.highAssetPercentage() * 100, this.mediumAssetPercentage() * 100, this.lowAssetPercentage() * 100];
  }

  get isReady() {
    return this.reserveStore.reserveValue && this.reserveStore.reserveAssets?.length;
  }

  get tooltipOptions() {
    return {
      backgroundColor: 'rgb(76, 87, 92)',
      callbacks: {
        label: (x) => `${(x.raw as number).toFixed(2)}%`,
      },
    } as TooltipOptions;
  }

  get reserveValue(): number {
    if (!this.reserveStore.reserveValue) return 0;
    return this.numberService.fromString(fromWei(this.reserveStore.reserveValue, 18));
  }

  lowAssetPercentage(): number {
    return this.getAssetPercentage(AssetType.Low) / this.reserveValue;
  }

  mediumAssetPercentage(): number {
    return this.getAssetPercentage(AssetType.Medium) / this.reserveValue;
  }

  highAssetPercentage(): number {
    return this.getAssetPercentage(AssetType.High) / this.reserveValue;
  }

  private getAssetPercentage(type: AssetType): number {
    return (
      this.reserveStore.reserveAssets
        ?.filter((x) => x.type === type)
        .map((x) => x.total)
        .sum() ?? 0
    );
  }
}
