import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { captureFilter, numberToPixelsInterceptor } from '../../common';
import { IDesignSystemConfiguration } from '../../configuration';

import template from './k-icon.html';

import css from './k-icon.scss';

@customElement({
  name: 'k-icon',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KIcon implements ICustomElementViewModel {
  @bindable name = '';
  @bindable color = '';
  @bindable({ set: numberToPixelsInterceptor }) top = 0;
  @bindable({ set: numberToPixelsInterceptor }) size = 0;
  object?: HTMLObjectElement;
  view?: string;

  constructor(@IDesignSystemConfiguration private readonly configuration: IDesignSystemConfiguration) {}

  nameChanged(): void {
    const url = this.configuration.iconMap?.get(this.name);
    if (!url) return;

    void fetch(url).then((x) => {
      void x.text().then((y) => (this.view = y));
    });
  }

  get styles(): Record<string, unknown> {
    return {
      color: this.color && this.color,
      width: this.size,
      height: this.size,
      marginTop: this.top,
    };
  }

  attached(): void {
    this.nameChanged();
  }
}
