import './value-by-asset-type-card.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { ITreasuryStore } from './../../../../../../stores/treasury-store';
import template from './value-by-asset-type-card.html';

@customElement({ name: 'value-by-asset-type-card', template })
export class ValueByAssetTypeCard implements ICustomElementViewModel {
  constructor(@ITreasuryStore private readonly treasuryStore: ITreasuryStore) {}
}
