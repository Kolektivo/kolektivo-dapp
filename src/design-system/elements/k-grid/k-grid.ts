import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { Grid } from '../../base/grid';
import { captureFilter, gridTemplateRowSetterInterceptor } from '../../common';

import template from './k-grid.html';

import css from './k-grid.scss';

@customElement({
  name: 'k-grid',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KGrid extends Grid implements ICustomElementViewModel {
  @bindable({ set: gridTemplateRowSetterInterceptor }) rows?: number;
  @bindable({ set: gridTemplateRowSetterInterceptor }) cols?: number;

  get slotStyle(): Record<string, unknown> {
    return {
      display: 'grid',
      gridTemplateRows: this.rows,
      gridTemplateColumns: this.cols,
      ...this.gridStyle,
    };
  }
}
