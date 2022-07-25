import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';
import { NotificationType } from '../../services/notification/notification-type';

export class KAlert implements ICustomElementViewModel {
  @bindable type: NotificationType = 'warning';
  @bindable icon = '';
  @bindable top = '';
  @bindable bottom = '';

  getIconName(): 'error_filled' | 'check_circle_filled' | 'warning_filled' | 'info_filled' {
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
  margin(): string {
    let styles = '';
    if (this.top) styles += `margin-top: ${this.top};`;
    if (this.bottom) styles += `margin-bottom: ${this.bottom};`;
    return styles;
  }
}
(CustomElement.getDefinition(KAlert) as { capture: boolean }).capture = true;
