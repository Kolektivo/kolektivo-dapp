import { DI, IContainer, Registration } from 'aurelia';
// import { I18N } from '@aurelia/i18n';

export type CannedFormats = 'full' | 'long' | 'medium' | 'short';
/**
 * canned and other INTL formats: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * Aurelia doesn't appear to support the CannedFormats
 */
// export interface IFormats {
//   dateFormat?: CannedFormats;
//   timeFormat?: CannedFormats;
//   // see notes in DateService about utc
//   utc?: boolean;
//}

interface IDateTimeFormatOptions1 {
  calendar?: string | undefined;
  dayPeriod?: 'narrow' | 'short' | 'long' | undefined;
  numberingSystem?: string | undefined;

  dateStyle?: CannedFormats | undefined;
  timeStyle?: CannedFormats | undefined;
  hourCycle?: 'h11' | 'h12' | 'h23' | 'h24' | undefined;
  utc?: boolean;
}

export interface IDateTimeFormatOptions extends IDateTimeFormatOptions1 {
  localeMatcher?: 'best fit' | 'lookup' | undefined;
  weekday?: 'long' | 'short' | 'narrow' | undefined;
  era?: 'long' | 'short' | 'narrow' | undefined;
  year?: 'numeric' | '2-digit' | undefined;
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' | undefined;
  day?: 'numeric' | '2-digit' | undefined;
  hour?: 'numeric' | '2-digit' | undefined;
  minute?: 'numeric' | '2-digit' | undefined;
  second?: 'numeric' | '2-digit' | undefined;
  timeZoneName?: 'short' | 'long' | 'shortOffset' | 'longOffset' | 'shortGeneric' | 'longGeneric' | undefined;
  formatMatcher?: 'best fit' | 'basic' | undefined;
  hour12?: boolean | undefined;
  timeZone?: string | undefined;
}

export type IDateServiceIntl = DateServiceIntl;
export const IDateServiceIntl = DI.createInterface<IDateServiceIntl>('DateServiceIntl');

export class DateServiceIntl {
  // constructor(@IDateService private readonly dateService: IDateService, @I18N private readonly i18n: I18N) {}
  // constructor(@I18N private readonly i18n: I18N) {}

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IDateServiceIntl, DateServiceIntl));
  }

  public toString(date: Date | number | undefined, options?: IDateTimeFormatOptions): string | null {
    if (typeof date !== 'object') {
      return null;
    }

    /**
     * convert to the local timezone
     */
    // const thisMoment = this.dateService.createMoment(date, !!options?.utc);

    // return this.i18n.df(thisMoment.date(), options);
    return new Intl.DateTimeFormat('', {
      dateStyle: options?.dateStyle ?? 'long',
      timeStyle: options?.timeStyle ?? 'long',
      //}).format(thisMoment.date());
    }).format(date);
  }

  // public fromString(dateString: string, formats?: IFormats): Date | null {
  //   if (typeof dateString !== 'string') {
  //     return null;
  //   }

  //   /**
  //    * convert to the designed timezone
  //    */
  //   const thisMoment = this.dateService.createMoment(dateString, !!formats?.utc);

  //   return new Intl.DateTimeFormat('', {
  //     dateStyle: formats?.dateFormat ?? 'long',
  //     timeStyle: formats?.timeFormat ?? 'long',
  //   }).format(thisMoment.date());
  // }
}
