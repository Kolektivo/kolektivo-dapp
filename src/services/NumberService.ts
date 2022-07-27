import { BigNumber } from 'ethers';
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
   * @param value
   * @param format
   */
  public toString(value: number | string | BigNumber, options?: IToStringOptions): string | null | undefined {
    // this helps to display the erroneus value in the GUI
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (typeof value === 'string' || value === null || value === undefined) {
      return value as string | null | undefined;
    }

    if (BigNumber.isBigNumber(value)) {
      value = value.toNumber(); // better not overflow, better not be wei
    }

    if (Number.isNaN(value)) {
      return null;
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
  public fromString(value?: string | number | BigNumber): number | undefined | null {
    if (value == null || typeof value === 'number') return value;

    if (BigNumber.isBigNumber(value)) {
      return value.toNumber(); // assuming this will not overflow
    }

    return this.i18n.uf(value);
  }

  /**
   * @param value
   * @returns true if value is a number.  BigNumber is not considered a number.
   */
  public stringIsNumber(value?: string | number): boolean {
    try {
      this.fromString(value);
      return true;
    } catch {
      return false;
    }
  }
}
