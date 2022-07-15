import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';
import { Grid } from '../../grid';
import { ICustomElementController } from '@aurelia/runtime-html';

export class KStack extends Grid implements ICustomElementViewModel {
  $controller?: ICustomElementController<this>;
  @bindable direction = 'column';

  constructor() {
    super();
  }

  binding() {
    if (this.direction === 'row') {
      this.alignItems = 'center';
      return;
    }
    if (this.direction === 'column') {
      this.justifyItems = 'center';
      return;
    }
  }

  get slotStyle() {
    /**
     * do not remove $controller, for some reason removing $controller causes a stack overflow in
     * au at load time.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { $controller, direction, ...viewModelProps } = this.$controller.viewModel;
    return {
      flexDirection: direction,
      flexWrap: 'wrap',
      ...viewModelProps,
    };
  }
}
(CustomElement.getDefinition(KStack) as { capture: boolean }).capture = true;
