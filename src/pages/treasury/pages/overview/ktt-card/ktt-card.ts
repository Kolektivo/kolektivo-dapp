import './ktt-card.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import template from './ktt-card.html';

@customElement({ name: 'ktt-card', template })
export class KttCard implements ICustomElementViewModel {}
