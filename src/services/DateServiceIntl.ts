import { DI, IContainer, Registration } from 'aurelia';
import { IDateService } from './DateService';

export type CannedFormats = 'full' | 'long' | 'medium' | 'short';
/**
 * canned and other INTL formats: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * Aurelia doesn't appear to support the CannedFormats.
 */
export interface IDateTimeFormatOptions extends IDateTimeFormatOptions2 {
  calendar?: string | undefined;
  dayPeriod?: 'narrow' | 'short' | 'long' | undefined;
  numberingSystem?: string | undefined;

  dateStyle?: CannedFormats | undefined;
  timeStyle?: CannedFormats | undefined;
  hourCycle?: 'h11' | 'h12' | 'h23' | 'h24' | undefined;
  utc?: boolean;
}

interface IDateTimeFormatOptions2 {
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
  constructor(@IDateService private readonly dateService: IDateService) {}

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IDateServiceIntl, DateServiceIntl));
  }

  public toString(date: Date | number | string | undefined, options?: IDateTimeFormatOptions): string | null {
    if (typeof date !== 'object' && typeof date !== 'number' && typeof date !== 'undefined' && typeof date !== 'string') {
      return null;
    }

    if (typeof date === 'string') {
      date = new Date(date);
    }

    return new Intl.DateTimeFormat(
      undefined,
      Object.assign(
        {
          timeZone: options?.utc ? 'UTC' : undefined,
        },
        options,
      ),
    ).format(date);
  }
}
