import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { captureFilter } from '../../../design-system/common';

import template from './avatar-text.html';
import css from './avatar-text.scss?inline';

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
  @bindable textColor?: string;
  @bindable textSize = 16;
}
