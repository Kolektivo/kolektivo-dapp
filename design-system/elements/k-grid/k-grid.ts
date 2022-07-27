import { Grid } from '../../base/grid';
import { ICustomElementViewModel, bindable, capture } from 'aurelia';
import { gridTemplateRowSetterInterceptor } from './../../common';

@capture()
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
