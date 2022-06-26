import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';
import { Grid } from '../../grid';
import { ICustomElementController } from '@aurelia/runtime-html';
import { gridTemplateRowSetter } from './../../common';

export class KGrid extends Grid implements ICustomElementViewModel {
  $controller?: ICustomElementController<this>;
  @bindable({ set: gridTemplateRowSetter }) rows: number;
  @bindable({ set: gridTemplateRowSetter }) columns: number;

  constructor() {
    super();
  }

  get slotStyle() {
    const { $controller, ...viewModelProps } = this.$controller.viewModel;
    return viewModelProps;
  }
}
(CustomElement.getDefinition(KGrid) as { capture: boolean }).capture = true;
