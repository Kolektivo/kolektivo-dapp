/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { DI } from 'aurelia';

export const IDesignSystemConfiguration = DI.createInterface<IDesignSystemConfiguration>('IDesignSystemConfiguration');

export interface IDesignSystemConfiguration {
  components?: [];
  includeAllComponents?: boolean;
  formatNumber?: (value?: string | number | bigint) => string;
  formatCurrency?: (value?: string | number | bigint) => string;
  formatPercent?: (value?: string | number | bigint) => string;
  formatDateTime?: (value?: string | number | Date) => string;
  formatDate?: (value?: string | number | Date) => string;
  iconMap?: Map<string, string>;
  defaultToastTimeout?: number;
}
