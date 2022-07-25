import { ButtonSize } from './button-size';
import { CustomElement, bindable } from 'aurelia';
import { IfExistsThenTrue } from './../../common';
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

export class KButton {
  @bindable fullWidth = false;
  @bindable type: ButtonType = '';
  @bindable color: ButtonColor = 'primary';
  @bindable size: ButtonSize | '' = '';
  @bindable({ set: IfExistsThenTrue }) loading = false;
  @bindable class = '';
  @bindable({ set: IfExistsThenTrue }) disabled;
}
(CustomElement.getDefinition(KButton) as { capture: boolean }).capture = true;
