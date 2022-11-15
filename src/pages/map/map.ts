import { customElement, ICustomElementViewModel } from 'aurelia';

import template from './map.html';

import './map.scss';

@customElement({ name: 'map', template })
export class Map implements ICustomElementViewModel {}
