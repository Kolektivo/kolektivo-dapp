import './header.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import template from './header.html';
@customElement({ name: 'header', template })
export class Header implements ICustomElementViewModel {}
