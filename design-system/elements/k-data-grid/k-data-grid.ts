import { ICustomElementViewModel, bindable } from 'aurelia';
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

  constructor() {
    // you can inject the element or any DI in the constructor
  }

  get cols() {
    return this.columns?.map(y => y.width).join(' ');
  }

  /**
   * This allows for more rows to be displayed on the grid
   * @param yesNo
   */
  public seeMore(yesNo: boolean): void {
    this.seeingMore = yesNo;
  }
}
