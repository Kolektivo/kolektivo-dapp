import { ButtonSize } from './button-size';
import { bindable, customElement, shadowCSS } from 'aurelia';
import { captureFilter, ifExistsThenTrue } from './../../common';
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
export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'utility-light' | 'utility-dark' | 'error';
import css from './k-button.scss';
import template from './k-button.html';

@customElement({
  name: 'k-button',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KButton {
  @bindable fullWidth = false;
  @bindable type: ButtonType = 'primary';
  @bindable size: ButtonSize | '' = '';
  @bindable({ set: ifExistsThenTrue }) loading = false;
  @bindable class = '';
  @bindable({ set: ifExistsThenTrue }) disabled = false;
  @bindable icon = '';

  get iconSize(): number {
    switch (this.size) {
      case 'xs':
        return 13;
      case 'sm':
        return 16;
      case 'lg':
        return 23;
      case 'xl':
        return 26;
      default:
        return 20;
    }
  }
}
