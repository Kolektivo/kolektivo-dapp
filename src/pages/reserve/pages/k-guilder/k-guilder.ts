import { customElement, ICustomElementViewModel } from 'aurelia';

import { IReserveStore } from '../../../../stores/reserve-store';

import * as elements from './elements';
import template from './k-guilder.html';

import './k-guilder.scss';

@customElement({ name: 'k-guilder', template, dependencies: [elements] })
export class KGuilder implements ICustomElementViewModel {
  constructor(@IReserveStore private readonly reserveStore: IReserveStore) {}
}
