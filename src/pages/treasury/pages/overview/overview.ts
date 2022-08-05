import './overview.scss';
import * as elements from './elements';
import { ICustomElementViewModel, customElement } from 'aurelia';
import template from './overview.html';

@customElement({ name: 'overview', template, dependencies: [elements] })
export class Overview implements ICustomElementViewModel {}
