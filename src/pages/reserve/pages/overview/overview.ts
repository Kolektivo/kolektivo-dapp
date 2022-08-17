import * as elements from './elements';
import { ICustomElementViewModel, customElement } from 'aurelia';

import './overview.scss';
import template from './overview.html';

@customElement({ name: 'overview', template, dependencies: [elements] })
export class Overview implements ICustomElementViewModel {}
