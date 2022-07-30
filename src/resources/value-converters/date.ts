import { IDateServiceIntl, IDateTimeFormatOptions } from '../../services/DateServiceIntl';
import { valueConverter } from 'aurelia';

@valueConverter('date')
export class DateValueConverter {
  constructor(@IDateServiceIntl private readonly dateServiceIntl: IDateServiceIntl) {}

  /**
   * Easiest is to pass for the options:
   *
   *   dateStyle: CannedFormats
   *   timeStyle: CannedFormats
   *
   * @param value
   * @param options
   * @returns
   */
  public toView(value: Date | number | undefined, options?: IDateTimeFormatOptions): string | null {
    return this.dateServiceIntl.toString(value, options);
  }
}
