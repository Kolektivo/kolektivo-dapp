import { ICustomElementViewModel, customElement } from 'aurelia';
import { IState } from '../../state';

import './map.scss';
import template from './map.html';

@customElement({ name: 'map', template })
export class Map implements ICustomElementViewModel {
  constructor(@IState { treasuryState }: IState) {}
}
