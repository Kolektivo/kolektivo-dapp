import { ICustomElementViewModel, customElement } from 'aurelia';

import './swap.scss';
import template from './swap.html';

@customElement({ name: 'swap', template })
export class Swap implements ICustomElementViewModel {}
