import './overview.scss';

import { ICustomElementViewModel, customElement } from 'aurelia';

import template from './overview.html';

@customElement({ name: 'overview', template })
export class Overview implements ICustomElementViewModel {}
