import { valueConverter } from 'aurelia';

import { IDateServiceIntl, IDateTimeFormatOptions } from '../../services/date-intl-service';

/**
 * Display localized date and time formats using the browser javascript INTL.
 * Note we also have the ability to use the @aurelia/i18n `dt` value converter,
 * but it doesn't support the canned formats that INTL supports (see DateServiceIntl).
 * This value converter supports everything from INTL.
 */
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
  public toView(value: Date | number | string | undefined, options?: IDateTimeFormatOptions): string | null {
    return this.dateServiceIntl.toString(value, options);
  }
}
