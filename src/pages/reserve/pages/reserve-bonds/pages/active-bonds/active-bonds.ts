import { ICustomElementViewModel, customElement } from 'aurelia';

import './active-bonds.scss';
import template from './active-bonds.html';

@customElement({ name: 'active-bonds', template })
export class ActiveBonds implements ICustomElementViewModel {}
