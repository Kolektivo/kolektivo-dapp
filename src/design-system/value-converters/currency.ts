import { valueConverter } from 'aurelia';

import { IDesignSystemConfiguration } from '../configuration';

@valueConverter('currency')
export class CurrencyValueConverter {
  constructor(@IDesignSystemConfiguration private readonly configuration: IDesignSystemConfiguration) {}

  public toView(value: string): string | number {
    return this.configuration.formatCurrency?.(value) ?? '';
  }
}
