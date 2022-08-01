import { ButtonSize } from './button-size';
import { bindable, customElement, shadowCSS } from 'aurelia';
import { ifExistsThenTrue } from './../../common';
/**
 * Usage:
 *    <pbutton type="primary">Primary</pbutton>
 *    <pbutton type="secondary">Secondary</pbutton>
 *    <pbutton type="tertiary">Tertiary</pbutton>
 *    <pbutton type="primary" disabled>Primary - Disabled</pbutton>
 *    <pbutton type="secondary" disabled>Secondary - Disabled</pbutton>
 *    <pbutton type="tertiary" disabled>Tertiary - Disabled</pbutton>
 *    <pbutton type="primary" click.delegate="message('Hi!')">Clickable</pbutton>
 *    <pbutton type="primary" no-animation>Not Animated</pbutton>
 *    <pbutton ... full-width>Full-Width</pbutton>
 */
export type ButtonType = '' | 'outlined' | 'link';
export type ButtonColor = 'primary' | 'secondary';

import css from './k-button.scss';
import template from './k-button.html';

@customElement({
  name: 'k-button',
  template,
  capture: true,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KButton {
  @bindable fullWidth = false;
  @bindable type: ButtonType = '';
  @bindable color: ButtonColor = 'primary';
  @bindable size: ButtonSize | '' = '';
  @bindable({ set: ifExistsThenTrue }) loading = false;
  @bindable class = '';
  @bindable({ set: ifExistsThenTrue }) disabled = false;
}
