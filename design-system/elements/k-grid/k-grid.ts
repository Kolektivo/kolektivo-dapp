import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';
import { Grid } from '../../base/grid';
import { gridTemplateRowSetter } from './../../common';

export class KGrid extends Grid implements ICustomElementViewModel {
  @bindable({ set: gridTemplateRowSetter }) rows: number;
  @bindable({ set: gridTemplateRowSetter }) cols: number;

  constructor() {
    super();
  }

  get slotStyle(): Record<string, unknown> {
    // console.log(this.gridStyle);
    return {
      display: 'grid',
      gridTemplateRows: this.rows,
      gridTemplateColumns: this.cols,
      ...this.gridStyle,
    };
  }
}
(CustomElement.getDefinition(KGrid) as { capture: boolean }).capture = true;
