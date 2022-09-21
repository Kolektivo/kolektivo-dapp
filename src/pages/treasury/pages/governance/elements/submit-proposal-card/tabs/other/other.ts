import './other.scss';
import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import template from './other.html';

@customElement({ name: 'other', template })
export class Other implements ICustomElementViewModel {}
