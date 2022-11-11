import { bindable, customElement, ICustomElementViewModel } from 'aurelia';

import { getColorByType } from '../../common';

import template from './k-toast.html';
import { ToastOptions } from './toast-options';

import './k-toast.scss';

function getFlexFromPosition(position: Position): string {
  const alignContent = position.startsWith('top') ? 'flex-start' : position.startsWith('bottom') ? 'flex-end' : 'center';
  const justifyContent = position.endsWith('start') ? 'flex-start' : position.endsWith('end') ? 'flex-end' : 'center';

  return `${alignContent} ${justifyContent}`;
}

@customElement({ name: 'k-toast', template })
export class KToast implements ICustomElementViewModel, ToastOptions {
  @bindable title?: string;
  @bindable message?: string;
  @bindable icon?: string;
  @bindable type: NotificationType = 'success';
  @bindable content?: string;
  @bindable position?: Position;
  @bindable animate = true;
  @bindable countdown?: number;
  @bindable close?: () => void;
  hovering = false;
  get styles(): Record<string, unknown> {
    return {
      placeContent: this.position ? getFlexFromPosition(this.position) : 'flex-start flex-end',
    };
  }

  get iconName(): string {
    if (this.icon) return this.icon;
    switch (this.type) {
      case 'danger':
        return 'cancel';
      case 'info':
        return 'info_filled';
      case 'success':
        return 'check_circle';
      case 'warning':
        return 'error';
      default:
        return ''; //TODO: choose default icon when none is passed and the NotificationType doesn't match anything
    }
  }

  getTitle(): string {
    if (this.title) return this.title;
    switch (this.type) {
      case 'danger':
        return 'Error';
      case 'info':
        return 'Information';
      case 'success':
        return 'Success';
      case 'warning':
        return 'Warning';
      default:
        return ''; //TODO: choose default title when none is passed and the NotificationType doesn't match anything
    }
  }

  get closeColor(): string {
    return getColorByType(this.type);
  }

  get startClass(): string | undefined {
    if (!this.animate) return undefined;
    if (this.position === 'bottom') return 'slide-in-bottom';
    if (!this.position || this.position.includes('end')) return 'slide-in-end';
    if (this.position.includes('start')) return 'slide-in-start';
    if (this.position === 'top') return 'slide-in-top';
    return undefined;
  }

  get endClass(): string | undefined {
    if (!this.animate) return undefined;
    if (this.position === 'bottom') return 'slide-out-bottom';
    if (!this.position || this.position.includes('end')) return 'slide-out-end';
    if (this.position.includes('start')) return 'slide-out-start';
    if (this.position === 'top') return 'slide-out-top';
    return undefined;
  }

  closeToast(): void {
    this.close?.();
  }

  mouseEnter(): void {
    this.hovering = true;
  }

  mouseLeave(): void {
    this.hovering = false;
  }
}
