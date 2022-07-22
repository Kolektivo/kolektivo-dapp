import './k-toast.scss';
import { ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { IToastOptions } from './toast-options';
import { NotificationAction, NotificationType } from '../../../design-system/services';
import { Position } from './../../types';
import template from './k-toast.html';

function getFlexFromPosition(position: Position): string {
  const alignContent = position.startsWith('top') ? 'flex-start' : position.startsWith('bottom') ? 'flex-end' : 'center';
  const justifyContent = position.endsWith('start') ? 'flex-start' : position.endsWith('end') ? 'flex-end' : 'center';

  return `${alignContent} ${justifyContent}`;
}

@customElement({ name: 'k-toast', template })
export class KToast implements ICustomElementViewModel, IToastOptions {
  @bindable message?: string;
  @bindable type?: NotificationType = 'info';
  @bindable actions?: NotificationAction[];
  @bindable position?: Position;
  @bindable animate = true;
  @bindable countdown?: number;

  get styles(): Record<string, unknown> {
    return {
      placeContent: this.position ? getFlexFromPosition(this.position) : 'flex-start flex-end',
    };
  }

  get startClass(): string | undefined {
    if (!this.animate) return undefined;
    if (this.position === 'bottom') return 'slide-in-bottom';
    if (!this.position || this.position?.includes('end')) return 'slide-in-end';
    if (this.position?.includes('start')) return 'slide-in-start';
    if (this.position === 'top') return 'slide-in-top';
    return undefined;
  }

  get endClass(): string | undefined {
    if (!this.animate) return undefined;
    if (this.position === 'bottom') return 'slide-out-bottom';
    if (!this.position || this.position?.includes('end')) return 'slide-out-end';
    if (this.position?.includes('start')) return 'slide-out-start';
    if (this.position === 'top') return 'slide-out-top';
    return undefined;
  }
}
