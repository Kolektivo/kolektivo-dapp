import { customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import template from './treasury.html';

import './treasury.scss';

@customElement({ name: 'treasury', template })
export class Treasury implements ICustomElementViewModel {}
