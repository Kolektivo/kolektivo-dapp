import { Grid } from '../../base/grid';
import { ICustomElementViewModel, bindable, customElement, shadowCSS } from 'aurelia';
import { captureFilter, gridTemplateRowSetterInterceptor } from './../../common';

import css from './k-grid.scss';
import template from './k-grid.html';

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
