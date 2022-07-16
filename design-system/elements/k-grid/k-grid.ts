import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';
import { Grid } from '../../grid';
import { ICustomElementController } from '@aurelia/runtime-html';
import { gridTemplateRowSetter } from './../../common';

export class KGrid extends Grid implements ICustomElementViewModel {
  $controller?: ICustomElementController<this>;
  @bindable({ set: gridTemplateRowSetter }) rows: number;
  @bindable({ set: gridTemplateRowSetter }) cols: number;

  constructor() {
    super();
  }

  get slotStyle(): Record<string, unknown> {
    const { $controller, rows, cols, ...viewModelProps } = this.$controller.viewModel;
    return {
      display: 'grid',
      gridTemplateRows: rows,
      gridTemplateColumns: cols,
      viewModelProps,
    };
  }
}
(CustomElement.getDefinition(KGrid) as { capture: boolean }).capture = true;
