import './token-info-card.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import template from './token-info-card.html';

@customElement({ name: 'token-info-card', template })
export class TokenInfoCard implements ICustomElementViewModel {}
