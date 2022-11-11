import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { Grid } from '../../base/grid';
import { captureFilter } from '../../common';

import template from './k-stack.html';

import css from './k-stack.scss';

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
