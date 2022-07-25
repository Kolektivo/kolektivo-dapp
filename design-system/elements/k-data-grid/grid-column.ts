export interface IGridColumn {
  field: string;
  headerText?: string;
  sortable?: boolean;
  width: string;
  headerClass?: string;
  align?: string;
  template?: string;
  sortFunc?: (a: unknown, b: unknown, sortDirection?: 'asc' | 'desc') => number;
}
