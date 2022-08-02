import { ICustomElementViewModel, customElement } from 'aurelia';

import './active-redemptions.scss';
import template from './active-redemptions.html';

@customElement({ name: 'active-redemptions', template })
export class ActiveRedemptions implements ICustomElementViewModel {}
