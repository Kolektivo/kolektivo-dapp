import { customElement, ICustomElementViewModel } from 'aurelia';

import * as elements from './elements';
import template from './k-guilder.html';

import './k-guilder.scss';

import { IReserveStore } from 'stores/reserve-store';

@customElement({ name: 'k-guilder', template, dependencies: [elements] })
export class KGuilder implements ICustomElementViewModel {
  constructor(@IReserveStore private readonly reserveStore: IReserveStore) {}
}
