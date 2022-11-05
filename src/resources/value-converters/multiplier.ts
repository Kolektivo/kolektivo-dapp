import { valueConverter } from 'aurelia';

/**
 * when a number is retrieved from the element to which it is bound, convert it from a string to a number.
 */
@valueConverter('multiplier')
export class MultiplierValueConverter {
  public toView(value: number): string {
    if (value !== 0 && !value) return '';
    return `${Math.round(value * 100) / 100}x`;
  }
}
