import { Prefix } from '../../config';
import { alias, bindable, } from "aurelia";
import { autoSlot } from '../../utils';
import { customElement, processContent } from '@aurelia/runtime-html';
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
export type ButtonType = "primary" | "secondary" | "tertiary" | "formfield";

export class PButton {
  @bindable type: ButtonType = 'primary';
  @bindable disabled = false;
  @bindable noAnimation = false;
  @bindable isLoading = false;
  @bindable fullWidth = false;


}

