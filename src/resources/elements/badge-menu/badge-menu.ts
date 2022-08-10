import './badge-menu.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import template from './badge-menu.html';

@customElement({
  name: 'badge-menu',
  template,
  capture: true,
})
export class BadgeMenu implements ICustomElementViewModel {}
