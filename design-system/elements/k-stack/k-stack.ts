import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';
import { Grid } from '../../base/grid';

export class KStack extends Grid implements ICustomElementViewModel {
  @bindable direction = 'column';

  constructor() {
    super();
  }

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
(CustomElement.getDefinition(KStack) as { capture: boolean }).capture = true;
