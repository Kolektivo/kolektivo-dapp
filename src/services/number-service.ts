import { BigNumber } from '@ethersproject/bignumber';

import { DI, IContainer, Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';

export interface IToStringOptions {
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
  /**
   * Is a percentage.  default is false.
   */
  isPercentage?: boolean;
  /**
   * Is a currency.  default is false.
   */
  isCurrency?: boolean;
}

export type INumberService = NumberService;
export const INumberService = DI.createInterface<INumberService>('NumberService');

export class NumberService {
  constructor(@I18N private readonly i18n: I18N) {}

  public static register(container: IContainer): void {
    container.register(Registration.singleton(INumberService, NumberService));
  }

  /**
   * Returns a string from a number or BigNumber.
   * @param value
   * @param format
   */
  public toString(value: number | string | BigNumber | null | undefined, options?: IToStringOptions): string | null | undefined {
    if (value === null || typeof value === 'undefined' || typeof value === 'string') {
      return value;
    }

    if (BigNumber.isBigNumber(value)) {
      value = value.toNumber(); // warning: could overflow
    }

    if (Number.isNaN(value)) {
      return 'NaN';
    }

    const useGrouping = options?.useGrouping ?? true;
    const isPercentage = options?.isPercentage ?? false;
    const isCurrency = options?.isCurrency ?? false;
    // eslint-disable-next-line eqeqeq
    const fractionDigits = options?.fractionDigits == undefined ? 2 : this.fromString(options.fractionDigits) ?? 2;
    const format = isCurrency ? { style: 'currency', currency: 'USD' } : isPercentage ? { style: 'percent' } : { style: 'decimal' };

    return this.i18n.nf(
      value,
      Object.assign(format, {
        useGrouping,
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      }),
    );
  }

  /**
   * returns number from string.
   * @param value the value
   */
  public fromString(value?: string | number | null | undefined): number | null | undefined {
    if (value === null || typeof value === 'undefined' || typeof value === 'number') {
      return value;
    }

    return this.i18n.uf(value);
  }
}
