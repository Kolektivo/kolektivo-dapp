import { BigNumber } from 'ethers';
import { INumberService, IToStringOptions } from '../../services/NumberService';
import { valueConverter } from 'aurelia';

/**
 * when a number is retrieved from the element to which it is bound, convert it from a string to a number.
 */
@valueConverter('number')
export class CurrencyValueConverter {
  constructor(@INumberService private readonly numberService: INumberService) {}

  public toView(value: number | string | BigNumber, options?: IToStringOptions): string {
    return this.numberService.toString(value, Object.assign(options ?? {}, { isPercentage: false, isCurrency: true })) ?? value.toString();
  }
}
