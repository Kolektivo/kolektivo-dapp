import { DI } from 'aurelia';

export const IDesignSystemConfiguration = DI.createInterface<IDesignSystemConfiguration>('IDesignSystemConfiguration');

export interface INumberFormatOptions {
  /**
   * The minimum number of fraction digits to use.
   * Default is 2
   */
  fractionDigits?: string | number;
  /**
   * Whether to use grouping separators, such as thousands separators or thousand/lakh/crore separators.
   * Default is true.
   */
  useGrouping?: boolean;
}

export interface IDesignSystemConfiguration {
  components?: [];
  includeAllComponents?: boolean;
  formatNumber?: (value?: string | number, options?: INumberFormatOptions) => string;
  formatCurrency?: (value?: string | number, options?: INumberFormatOptions) => string;
  formatPercent?: (value?: string | number, options?: INumberFormatOptions) => string;
  formatDateTime?: (value?: string | number | Date) => string;
  formatDate?: (value?: string | number | Date) => string;
  iconMap?: Map<string, string>;
  defaultToastTimeout?: number;
}
