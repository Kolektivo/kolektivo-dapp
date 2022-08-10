import './value-card.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import template from './value-card.html';

@customElement({ name: 'value-card', template })
export class ValueCard implements ICustomElementViewModel {}
