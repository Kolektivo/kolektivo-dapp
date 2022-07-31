import { BigNumber } from 'ethers';
import { INumberService, IToStringOptions } from '../../services/NumberService';
import { valueConverter } from 'aurelia';

/**
 * when a number is retrieved from the element to which it is bound, convert it from a string to a number.
 */
@valueConverter('number')
export class NumberValueConverter {
  constructor(@INumberService private readonly numberService: INumberService) {}

  public toView(value: number | string | BigNumber, options?: IToStringOptions): string {
    return this.numberService.toString(value, options) ?? value.toString();
  }

  // public fromView(value: number | string | null | undefined): number | null | undefined {
  //   return this.NumberService.fromString(value);
  // }
}
