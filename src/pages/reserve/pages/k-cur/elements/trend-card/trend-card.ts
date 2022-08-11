import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import template from './trend-card.html';

@customElement({ name: 'trend-card', template })
export class TrendCard implements ICustomElementViewModel {}
