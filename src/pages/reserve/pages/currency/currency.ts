import { ICustomElementViewModel, alias, customElement } from 'aurelia';

import './currency.scss';
import template from './currency.html';

@alias('kCur')
@customElement({ name: 'currency', template })
export class Currency implements ICustomElementViewModel {}
