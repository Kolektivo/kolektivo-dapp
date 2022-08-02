import { ICustomElementViewModel, bindable, customElement, shadowCSS } from 'aurelia';
import css from './k-select.scss';

import template from './k-select.html';

@customElement({
  name: 'k-select',
  template,
  capture: true,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KSelect implements ICustomElementViewModel {
  @bindable options = [];
  @bindable placeholder?: string;
  changed(): void {
    (document.activeElement as HTMLElement).blur();
  }
}
