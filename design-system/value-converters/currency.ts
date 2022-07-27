import { IDesignSystemConfiguration } from '../configuration';
import { valueConverter } from 'aurelia';

@valueConverter('currency')
export class CurrencyValueConverter {
  constructor(@IDesignSystemConfiguration private readonly configuration: IDesignSystemConfiguration) {}

  public toView(value: string): string | number {
    return this.configuration.formatCurrency?.(value) ?? '';
  }
}
