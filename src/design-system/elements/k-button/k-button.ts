import { CustomElement, bindable } from 'aurelia';
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
export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'formfield';

export class KButton {
  @bindable fullWidth = false;
  @bindable type: ButtonType = 'primary';
  @bindable size: '' | 'xs' | 'sm' | 'lg' | 'xl' = '';
  @bindable isLoading = false;
  @bindable class = '';
}
(CustomElement.getDefinition(KButton) as { capture: boolean }).capture = true;
