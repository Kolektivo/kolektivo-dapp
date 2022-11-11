import { bindable, customElement, ICustomAttributeViewModel, ICustomElementViewModel, shadowCSS } from 'aurelia';
import { ICustomAttributeController, ICustomElementController, ViewModelKind } from '@aurelia/runtime-html';

import { captureFilter } from '../../common';

import { IGridColumn } from './grid-column';
type ElementOrAttributeViewModel = ICustomElementController | ICustomAttributeController;
import template from './k-data-grid.html';

import css from './k-data-grid.scss';

@customElement({
  name: 'k-data-grid',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KDataGrid implements ICustomElementViewModel {
  @bindable id?: string;
  @bindable condensed = false;
  @bindable public rows: [] = [];
  @bindable public columns: IGridColumn[] = [];
  @bindable public selectable = false;
  @bindable public sortColumn?: string;
  @bindable public sortDirection?: 'asc' | 'desc';
  @bindable public numberToShow = 10;
  @bindable public hideMore = true;
  private seeingMore = false;
  context?: ICustomElementViewModel | ICustomAttributeViewModel;

  get cols(): string {
    return this.columns.map((y) => y.width).join(' ');
  }

  binding(top: ElementOrAttributeViewModel, direct: ElementOrAttributeViewModel): void {
    this.context = direct.viewModel;
    let controller: ElementOrAttributeViewModel = top;
    for (let i = 0; i < 4; i++) {
      if (controller.vmKind === ViewModelKind.customElement) {
        this.context = controller.viewModel;
        break;
      }
      controller = controller.parent as ICustomElementController<this>;
    }
  }
  getBuffedVm(row: Record<string | number | symbol, unknown>): unknown {
    const vm = { ...(this.context ?? {}), ...row, row: row } as Record<string, unknown>;
    if (this.context) {
      Object.keys(Object.getOwnPropertyDescriptors(Object.getPrototypeOf(this.context)))
        .filter((y) => y !== 'constructor' && y !== 'bind' && y !== '__metadata__' && y !== 'activate')
        .forEach((y) => {
          vm[y] = (this.context as Record<string, unknown>)[y];
        });
    }
    return vm;
  }

  /**
   * This allows for more rows to be displayed on the grid
   * @param yesNo
   */
  public seeMore(yesNo: boolean): void {
    this.seeingMore = yesNo;
  }
}
