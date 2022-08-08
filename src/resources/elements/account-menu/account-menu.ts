import './account-menu.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import template from './account-menu.html';

@customElement({
  name: 'account-menu',
  template,
  capture: true,
})
export class AccountMenu implements ICustomElementViewModel {}
