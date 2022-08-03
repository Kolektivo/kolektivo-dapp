import { ICustomElementViewModel, customElement } from 'aurelia';

import './governance.scss';
import template from './governance.html';

@customElement({ name: 'governance', template })
export class Governance implements ICustomElementViewModel {}
