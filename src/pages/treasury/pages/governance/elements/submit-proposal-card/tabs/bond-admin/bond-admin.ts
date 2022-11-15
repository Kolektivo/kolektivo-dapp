import { customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import template from './bond-admin.html';

import './bond-admin.scss';

@customElement({ name: 'bond-admin', template })
export class BondAdmin implements ICustomElementViewModel {}
