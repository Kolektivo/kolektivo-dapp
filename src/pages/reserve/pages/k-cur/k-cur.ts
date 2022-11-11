import { customElement, ICustomElementViewModel } from 'aurelia';

import * as elements from './elements';
import template from './k-cur.html';

import './k-cur.scss';

@customElement({ name: 'k-cur', template, dependencies: [elements] })
export class KCur implements ICustomElementViewModel {}
