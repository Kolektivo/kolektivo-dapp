import { customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import template from './other.html';

import './other.scss';

@customElement({ name: 'other', template })
export class Other implements ICustomElementViewModel {}
