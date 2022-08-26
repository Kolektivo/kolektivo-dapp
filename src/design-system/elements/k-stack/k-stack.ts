import { Grid } from '../../base/grid';
import { ICustomElementViewModel, bindable, customElement, shadowCSS } from 'aurelia';
import { captureFilter } from '../../common';

import css from './k-stack.scss';

import template from './k-stack.html';

@customElement({
  name: 'k-stack',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KStack extends Grid implements ICustomElementViewModel {
  @bindable direction = 'column';

  binding(): void {
    if (this.direction === 'row') {
      this.alignItems = 'center';
      return;
    }
    if (this.direction === 'column') {
      this.justifyItems = 'center';
      return;
    }
  }

  get slotStyle(): Record<string, unknown> {
    return {
      flexDirection: this.direction,
      flexWrap: 'wrap',
      ...this.gridStyle,
    };
  }
}
