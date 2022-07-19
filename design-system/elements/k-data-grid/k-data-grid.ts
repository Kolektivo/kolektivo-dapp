import { ICustomAttributeViewModel, ICustomElementViewModel, bindable } from 'aurelia';
import { ICustomElementController, ViewModelKind } from '@aurelia/runtime-html';
import { IGridColumn } from './grid-column';

export class KDataGrid implements ICustomElementViewModel {
  @bindable id?: string;
  @bindable condensed = false;
  @bindable public rows: [] = [];
  @bindable public columns: IGridColumn[] = [];
  @bindable public selectable = false;
  @bindable public sortColumn: string;
  @bindable public sortDirection: 'asc' | 'desc';
  @bindable public numberToShow = 10;
  @bindable public hideMore = true;
  private seeingMore = false;
  context: ICustomElementViewModel | ICustomAttributeViewModel;
  constructor() {
    // you can inject the element or any DI in the constructor
  }

  get cols(): string {
    return this.columns?.map(y => y.width).join(' ');
  }
  binding(top: ICustomElementController<this>, direct: ICustomElementController<this>): void {
    this.context = direct.viewModel;
    if (this.context) return;
    let controller: ICustomElementController<this> = top;
    for (let i = 0; i < 4; i++) {
      if (controller.vmKind === ViewModelKind.customElement) {
        this.context = controller.viewModel;
        break;
      }
      controller = controller.parent as ICustomElementController<this>;
    }
  }
  getBuffedVm(row: Record<string | number | symbol, unknown>): unknown {
    const vm = { ...(this.context ?? {}), ...row, row: row };
    if (this.context) {
      Object.keys(Object.getOwnPropertyDescriptors(Object.getPrototypeOf(this.context)))
        .filter(y => y !== 'constructor' && y !== 'bind' && y !== '__metadata__' && y !== 'activate')
        .forEach(y => {
          vm[y] = this.context[y];
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
