import { customElement, ICustomElementViewModel } from 'aurelia';

import * as elements from './elements';
import template from './risk.html';

import './risk.scss';

@customElement({ name: 'risk', template, dependencies: [elements] })
export class Risk implements ICustomElementViewModel {}
