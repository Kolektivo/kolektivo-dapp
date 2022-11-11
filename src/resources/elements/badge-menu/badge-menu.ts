import { customElement, ICustomElementViewModel } from 'aurelia';

import template from './badge-menu.html';

import './badge-menu.scss';

@customElement({
  name: 'badge-menu',
  template,
  capture: true,
})
export class BadgeMenu implements ICustomElementViewModel {}
