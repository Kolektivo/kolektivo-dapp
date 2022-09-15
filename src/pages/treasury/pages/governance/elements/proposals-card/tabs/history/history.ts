import './history.scss';
import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import { ITreasuryStore } from 'stores';
import template from './history.html';

@customElement({ name: 'history', template })
export class History implements ICustomElementViewModel {
  constructor(@ITreasuryStore private readonly treasuryStore: ITreasuryStore) {}
}
