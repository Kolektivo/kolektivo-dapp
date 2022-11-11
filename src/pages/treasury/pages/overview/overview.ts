import { customElement, ICustomElementViewModel } from 'aurelia';

import * as elements from './elements';
import template from './overview.html';

import './overview.scss';

@customElement({ name: 'overview', template, dependencies: [elements] })
export class Overview implements ICustomElementViewModel {}
