import { ICustomElementViewModel, bindable, customElement, shadowCSS } from 'aurelia';
import { captureFilter } from 'design-system/common';
import css from './avatar-text.scss';
import template from './avatar-text.html';

@customElement({
  name: 'avatar-text',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class AvatarText implements ICustomElementViewModel {
  @bindable src?: string;
  @bindable size = 24;
  @bindable icon?: string;
  @bindable name?: string;
  @bindable color?: string;
}
