import { DI, valueConverter } from 'aurelia';

import { IDesignSystemConfiguration } from '../configuration';

export const ICurrency = DI.createInterface<ICurrency>((x) => x.singleton(Currency));
export type ICurrency = Currency;
@valueConverter('currency')
export class Currency {
  constructor(@IDesignSystemConfiguration private readonly configuration: IDesignSystemConfiguration) {}

  public toView(value: string, decimals?: number): string | number {
    return this.configuration.formatCurrency?.(value, decimals) ?? '';
  }
}
