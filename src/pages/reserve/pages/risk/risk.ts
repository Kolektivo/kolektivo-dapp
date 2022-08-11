import './risk.scss';
import * as elements from './elements';
import { ICustomElementViewModel, customElement } from 'aurelia';
import template from './risk.html';

@customElement({ name: 'risk', template, dependencies: [elements] })
export class Risk implements ICustomElementViewModel {}
