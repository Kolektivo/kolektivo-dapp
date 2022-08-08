import './dashboard.scss';
import * as elements from './elements';
import { ICustomElementViewModel, customElement } from 'aurelia';
import template from './dashboard.html';

@customElement({ name: 'dashboard', template, dependencies: [elements] })
export class Dashboard implements ICustomElementViewModel {}
