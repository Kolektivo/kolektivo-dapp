import { ICustomElementViewModel, customElement } from 'aurelia';

import './mento.scss';
import template from './mento.html';

@customElement({ name: 'mento', template })
export class Mento implements ICustomElementViewModel {}
