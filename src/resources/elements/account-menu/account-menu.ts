import { customElement, ICustomElementViewModel } from 'aurelia';

import template from './account-menu.html';

import './account-menu.scss';

@customElement({
  name: 'account-menu',
  template,
  capture: true,
})
export class AccountMenu implements ICustomElementViewModel {}
