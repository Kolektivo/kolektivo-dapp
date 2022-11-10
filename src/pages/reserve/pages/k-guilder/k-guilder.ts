import './k-guilder.scss';
import * as elements from './elements';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IReserveStore } from 'stores/reserve-store';
import template from './k-guilder.html';

@customElement({ name: 'k-guilder', template, dependencies: [elements] })
export class KGuilder implements ICustomElementViewModel {
  constructor(@IReserveStore private readonly reserveStore: IReserveStore) {}
}
