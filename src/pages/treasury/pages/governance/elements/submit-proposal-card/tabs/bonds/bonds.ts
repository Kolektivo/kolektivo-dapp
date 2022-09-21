import './bonds.scss';
import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import template from './bonds.html';

@customElement({ name: 'bonds', template })
export class Bonds implements ICustomElementViewModel {}
