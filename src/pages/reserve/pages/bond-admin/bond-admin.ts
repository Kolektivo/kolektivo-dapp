import './bond-admin.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import template from './bond-admin.html';

@customElement({ name: 'bond-admin', template })
export class BondAdmin implements ICustomElementViewModel {}
