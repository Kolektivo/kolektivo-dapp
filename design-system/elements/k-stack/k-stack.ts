import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';
import { Grid } from '../../grid';
import { ICustomElementController } from '@aurelia/runtime-html';

export class KStack extends Grid implements ICustomElementViewModel {
  $controller?: ICustomElementController<this>;
  @bindable direction = 'column';

  constructor() {
    super();
    if (this.direction === 'column') {
      this.alignItems = 'center';
      return;
    }
    if (this.direction === 'column') {
      this.justifyItems = 'center';
      return;
    }
  }

  get divStyle() {
    const { $controller, ...viewModelProps } = this.$controller.viewModel;
    return viewModelProps;
  }
}
(CustomElement.getDefinition(KStack) as { capture: boolean }).capture = true;
