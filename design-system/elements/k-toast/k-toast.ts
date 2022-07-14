import './k-toast.scss';
import { ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { INotificationAction, NotificationType } from '../../../design-system/services';
import { IToastOptions } from './toast-options';
import { Position } from './../../types';
import template from './k-toast.html';

function getFlexFromPosition(position: Position) {
  const alignContent = position.startsWith('top') ? 'flex-start' : position.startsWith('bottom') ? 'flex-end' : 'center';
  const justifyContent = position.endsWith('start') ? 'flex-start' : position.endsWith('end') ? 'flex-end' : 'center';

  return `${alignContent} ${justifyContent}`;
}

@customElement({ name: 'k-toast', template })
export class KToast implements ICustomElementViewModel, IToastOptions {
  @bindable message?: string;
  @bindable type?: NotificationType = 'info';
  @bindable actions?: INotificationAction[];
  @bindable position?: Position;

  get styles() {
    return {
      placeContent: this.position ? getFlexFromPosition(this.position) : 'flex-start flex-end',
    };
  }
}
