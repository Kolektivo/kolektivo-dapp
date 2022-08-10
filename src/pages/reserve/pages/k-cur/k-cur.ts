import './k-cur.scss';
import * as elements from './elements';
import { ICustomElementViewModel, customElement } from 'aurelia';
import template from './k-cur.html';

@customElement({ name: 'k-cur', template, dependencies: [elements] })
export class KCur implements ICustomElementViewModel {}
