import { ICustomElementViewModel, customElement } from 'aurelia';

import './dashboard.scss';
import template from './dashboard.html';

@customElement({ name: 'dashboard', template })
export class Dashboard implements ICustomElementViewModel {}
