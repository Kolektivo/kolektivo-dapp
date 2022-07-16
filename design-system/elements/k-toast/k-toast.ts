import './k-toast.scss';
import { ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { NotificationAction, NotificationType } from '../../../design-system/services';
import { Position } from './../../types';
import { ToastOptions } from './toast-options';
import template from './k-toast.html';

function getFlexFromPosition(position: Position): string {
  const alignContent = position.startsWith('top') ? 'flex-start' : position.startsWith('bottom') ? 'flex-end' : 'center';
  const justifyContent = position.endsWith('start') ? 'flex-start' : position.endsWith('end') ? 'flex-end' : 'center';

  return `${alignContent} ${justifyContent}`;
}

@customElement({ name: 'k-toast', template })
export class KToast implements ICustomElementViewModel, ToastOptions {
  @bindable message?: string;
  @bindable type?: NotificationType = 'info';
  @bindable actions?: NotificationAction[];
  @bindable position?: Position;

  get styles(): Record<string, unknown> {
    return {
      placeContent: this.position ? getFlexFromPosition(this.position) : 'flex-start flex-end',
    };
  }
}
