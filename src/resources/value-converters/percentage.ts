import { valueConverter } from 'aurelia';

import { INumberService, IToStringOptions } from '../../services/number-service';

import { BigNumber } from '@ethersproject/bignumber';

/**
 * when a number is retrieved from the element to which it is bound, convert it from a string to a number.
 */
@valueConverter('percentage')
export class PercentageValueConverter {
  constructor(@INumberService private readonly numberService: INumberService) {}

  public toView(value: number | string | BigNumber, options?: IToStringOptions): string {
    if (value !== 0 && !value) return '';
    return this.numberService.toString(value, Object.assign(options ?? {}, { isPercentage: true, isCurrency: false })) ?? value.toString();
  }
}
