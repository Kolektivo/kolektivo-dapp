import { Grid } from '../../base/grid';
import { ICustomElementViewModel, bindable, capture } from 'aurelia';

@capture()
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
