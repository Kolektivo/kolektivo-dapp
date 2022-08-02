import { ICustomElementViewModel, customElement } from 'aurelia';

import './map.scss';
import template from './map.html';

@customElement({ name: 'map', template })
export class Map implements ICustomElementViewModel {}
