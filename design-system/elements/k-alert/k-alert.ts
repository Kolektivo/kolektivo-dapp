import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';

export type AlertType = 'danger' | 'success' | 'warning' | 'info' | 'secondary' | 'dark';
export class KAlert implements ICustomElementViewModel {
  @bindable type: AlertType = 'warning';
  @bindable icon = '';
  @bindable top = '';
  @bindable bottom = '';

  getIconName() {
    switch (this.type) {
      case 'danger':
        return 'error_filled';
      case 'success':
        return 'check_circle_filled';
      case 'warning':
        return 'warning_filled';
      case 'info':
        return 'info_filled';
      default:
        return 'check_circle_filled';
    }
  }
  margin() {
    let styles = '';
    if (this.top) styles += `margin-top: ${this.top};`;
    if (this.bottom) styles += `margin-bottom: ${this.bottom};`;
    return styles;
  }
}
(CustomElement.getDefinition(KAlert) as { capture: boolean }).capture = true;
