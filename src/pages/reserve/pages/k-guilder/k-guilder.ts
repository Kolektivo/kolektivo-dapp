import './k-guilder.scss';
import * as elements from './elements';
import { ICustomElementViewModel, customElement } from 'aurelia';
import template from './k-guilder.html';

@customElement({ name: 'k-guilder', template, dependencies: [elements] })
export class KGuilder implements ICustomElementViewModel {}
