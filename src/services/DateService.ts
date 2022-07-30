import { DI, IContainer, Registration } from 'aurelia';
import moment from 'moment-timezone';
import Moment = moment.Moment;

export type IDateService = DateService;
export const IDateService = DI.createInterface<IDateService>('DateService');

export class DateService {
  public static register(container: IContainer): void {
    container.register(Registration.singleton(IDateService, DateService));
  }

  public get tomorrow(): Date {
    const tomorrow = this.createMoment().add(1, 'days');
    const dtTomorrow = new Date(tomorrow.year(), tomorrow.month(), tomorrow.date());
    return dtTomorrow;
  }

  public get today(): Date {
    const today = this.createMoment();
    const dtToday = new Date(today.year(), today.month(), today.date());
    return dtToday;
  }

  public get utcNow(): Date {
    return this.createMoment(undefined, true).toDate();
  }

  public midnightOf(dt: Date): Date {
    const day = this.createMoment(dt);
    const dtMidnight = new Date(day.year(), day.month(), day.date());
    return dtMidnight;
  }

  public localTimezoneOffset = 0;
  public localTimezone = '';

  private formats = new Map<string, string>();

  constructor() {
    this.initTimezone();
    this.configure();
  }

  private initTimezone(): void {
    this.localTimezoneOffset = moment().utcOffset();
    this.localTimezone = moment.tz.guess();
  }

  private configure(): void {
    // spacial case localize for diff display.
    moment.updateLocale('en-custom', {
      relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: '< 1 min',
        ss: '< 1 min',
        m: '%d min',
        mm: '%d min',
        h: '%d h',
        hh: '%d h',
        d: '%d d',
        dd: '%d d',
        w: '%d w',
        ww: '%d w',
        M: '%d mo',
        MM: '%d mo',
        y: '%d y',
        yy: '%d y',
      },
    });

    const formatArray: IFormat[] = [
      {
        format: 'ZZ',
        key: 'GmtOffset',
      },
      {
        format: 'h:mma',
        key: 'amPmTime',
      },
      {
        format: 'h:mma z',
        key: 'amPmHourTz',
      },
      {
        format: 'MMM Do',
        key: 'shortdayofmonth',
      },
      {
        format: 'MMMM Do',
        key: 'dayofmonth',
      },
      {
        format: 'MMMM Do, YYYY',
        key: 'shortdate',
      },
      {
        format: 'dddd MMMM Do, YYYY',
        key: 'friendly',
      },
      {
        format: 'YYYY-MM-DD',
        key: 'table-date',
      },
      {
        format: 'YYYY-MM-DD HH:mm:ss',
        key: 'table-datetime',
      },
      {
        format: 'HH:mm:ss',
        key: 'table-time',
      },
      {
        format: 'HH[:]mm dddd MMMM Do, YYYY',
        key: 'friendlyDateTime',
      },
      {
        format: 'YYYY-MM-DDTHH:mm:ss.sssZ',
        key: 'json',
      },
    ];

    for (const format of formatArray) {
      this.formats.set(format.key, format.format);
    }
  }

  /**
   * This will literally change the value of the Date.  Use when a date has been
   * computed as being in Utc and you want the local time.
   * @param d
   */
  public translateUtcToLocal(d: Date): Date {
    return this.createMoment(d).subtract(this.localTimezoneOffset, 'minutes').toDate();
  }

  public translateLocalToUtc(d: Date): Date {
    return this.createMoment(d).add(this.localTimezoneOffset, 'minutes').toDate();
  }

  /**
   * input and output are in milliseconds
   * @param ts
   * @returns
   */
  public translateUtcTimestampToLocal(ts: number): number {
    return ts - this.localTimezoneOffset * 60 * 1000;
  }

  /**
   * @param ts input and output are in milliseconds
   * @returns
   */
  public translateLocalTimestampToUtc(ts: number): number {
    return ts + this.localTimezoneOffset * 60 * 1000;
  }

  /**
   * convert one date string to a different date string for the same date and time.
   * @param dateString
   * @param paramsFrom
   * @param paramsTo
   */
  public convertFormat(dateString: string, paramsFrom?: IFormatParameters | string, paramsTo?: IFormatParameters | string): string {
    if (paramsFrom === paramsTo) {
      return dateString;
    }

    return this.createMomentFromString(dateString, this.getSafeParams(paramsFrom).format).format(this.getSafeParams(paramsTo).format);
  }

  public ticksToString(ticks: number, params?: IFormatParameters | string): string | null {
    if (!ticks) {
      return '';
    }

    const d = this.createMomentFromTicks(ticks).toDate();

    // will account for optional utc here
    return this.toString(d, params);
  }

  public ticksToDate(ticks: number): Date | null {
    if (!ticks) {
      return null;
    }

    // utc is meaningless here
    return this.createMomentFromTicks(ticks).toDate();
  }

  public unixEpochToDate(seconds: number): Date | null {
    return this.ticksToDate(seconds * 1000);
  }

  public dateStringToTicks(dtString: string, params?: IFormatParameters | string): number {
    if (!dtString) {
      return 0;
    }

    const parms = this.getSafeParams(params);

    // ignore utc, is meaningless here
    return this.createMomentFromString(dtString, parms.format).valueOf();
  }

  public dateToTicks(dt: Date): number {
    if (typeof dt !== 'object') {
      return 0;
    }
    return this.createMoment(dt).valueOf();
  }

  public ticksToTimeSpanString(ms: number, resolution: TimespanResolution = TimespanResolution.milliseconds, abbrev = false): string | null {
    if (typeof ms !== 'number') {
      return null;
    }

    // eslint-disable-next-line no-bitwise
    const largest2 = resolution & TimespanResolution.largest2;
    // eslint-disable-next-line no-bitwise
    const largest = resolution & TimespanResolution.largest;

    if (largest2) {
      resolution = resolution - TimespanResolution.largest2;
    } else if (largest) {
      resolution = resolution - TimespanResolution.largest;
    }

    let firstResolution = false;
    let stop = false;
    let largestTwoCounter = 0;

    const days = Math.floor(ms / 86400000);
    ms = ms % 86400000;
    const hours = Math.floor(ms / 3600000);
    ms = ms % 3600000;
    const minutes = Math.floor(ms / 60000);
    ms = ms % 60000;
    const seconds = Math.floor(ms / 1000);
    ms = ms % 1000;

    let result = '';

    if (days) {
      result = `${days}${abbrev ? 'd' : days === 1 ? ' day' : ' days'}`;

      if (largest2) {
        largestTwoCounter += 1;
      } else if (largest) {
        stop = true;
      } else {
        firstResolution = true;
      }
    }

    if (
      !stop &&
      (is2ndLargest(largestTwoCounter) ||
        hours ||
        // show zero if not the first or is the res
        firstResolution ||
        resolution === TimespanResolution.hours) &&
      resolution <= TimespanResolution.hours
    ) {
      result += `${result.length ? ', ' : ''}${hours}${abbrev ? 'h' : hours === 1 ? ' hour' : ' hours'}`;

      if (largest2) {
        largestTwoCounter += 1;
      } else if (largest) {
        stop = true;
      } else {
        firstResolution = true;
      }
    }

    if (
      !stop &&
      !shouldStopOnLargest2(largestTwoCounter) &&
      (is2ndLargest(largestTwoCounter) ||
        minutes ||
        // show zero if not the first or is the res
        firstResolution ||
        resolution === TimespanResolution.minutes) &&
      resolution <= TimespanResolution.minutes
    ) {
      result += `${result.length ? ', ' : ''}${minutes}${abbrev ? 'm' : minutes === 1 ? ' minute' : ' minutes'}`;

      if (largest2) {
        largestTwoCounter += 1;
      } else if (largest) {
        stop = true;
      }
    }

    if (
      !stop &&
      !shouldStopOnLargest2(largestTwoCounter) &&
      (seconds ||
        // show zero if not the first or is the res
        firstResolution ||
        resolution === TimespanResolution.seconds) &&
      resolution <= TimespanResolution.seconds
    ) {
      result += `${result.length ? ', ' : ''}${seconds}${abbrev ? 's' : seconds === 1 ? ' second' : ' seconds'}`;

      if (largest2) {
        largestTwoCounter += 1;
      } else if (largest) {
        stop = true;
      }
    }

    if (!stop && !shouldStopOnLargest2(largestTwoCounter) && ms && resolution === TimespanResolution.milliseconds) {
      result += `${result.length ? ', ' : ''}${ms}${abbrev ? 'ms' : ms === 1 ? ' millisecond' : ' milliseconds'}`;
    }

    return result;
  }

  public toString(dt: Date, params?: IFormatParameters | string): string | null {
    if (typeof dt !== 'object') {
      return null;
    }

    const parms = this.getSafeParams(params);

    return this.createMoment(dt, parms.utc).format(parms.format);
  }

  /**
   * note this seems to be match quite well with the ISO standard, but the "json"
   * format in the config.json file doesn't.
   * @param dt
   */
  public toISOString(dt: Date, timezone?: string): string | null {
    if (typeof dt !== 'object') {
      return null;
    }

    return moment.tz(dt, timezone ? timezone : this.localTimezone).toISOString();
  }

  /**
   * Parse date from ISO format.
   *
   * ISO:  https://en.wikipedia.org/wiki/ISO_8601
   *
   * @param str
   */
  public fromIsoString(str: string): Date | null {
    if (!str) {
      return null;
    }

    return moment(str).toDate();
  }

  public nameofDay(day: number): string {
    return moment.weekdays(day);
  }

  public fromString(str: string, params?: IFormatParameters | string): Date | null {
    if (!str) {
      return null;
    }

    const parms = this.getSafeParams(params);

    // ignore utc, is meaningless here
    return this.createMomentFromString(str, parms.format).toDate();
  }

  /**
   * *day is 0-6, where 0 is sunday
   * @param day
   */
  public nextInstanceOfDay(dayTarget: number, includeToday = false): Date {
    const today = this.today;
    const dayToday = today.getDay();

    if (dayToday === dayTarget && includeToday) {
      return today;
    }

    const weeklen = dayTarget > dayToday ? 0 : 7;

    const nextInstance = this.createMoment(today).add(weeklen + dayTarget - dayToday, 'days');
    return new Date(nextInstance.year(), nextInstance.month(), nextInstance.date());
  }

  /**
   * return IFormatParameters from IFormatParameters|string.
   * params is either not set, or is a string which is the key to use, or is an IFormatParameters
   * @param params
   */
  public getSafeParams(params?: IFormatParameters | string | undefined | null): IFormatParameters {
    if (!params) {
      // return this.defaultTableFormat;
      return {};
    }

    /**
     * format can be either raw or a key into the config (this.formats)
     */
    if (typeof params === 'string') {
      return { format: this.formats.get(params) ?? params };
    } else {
      const parms = params;

      const format = parms.format ? this.formats.get(parms.format) ?? parms.format : undefined;
      return {
        format,
        utc: parms.utc,
      };
    }
  }

  public getDurationBetween(end: Date, start: Date): moment.Duration {
    if (typeof start !== 'object' || typeof end !== 'object') {
      moment.duration(0);
    }

    return moment.duration(end.valueOf() - start.valueOf());
  }

  /**
   * ## Returns formatted time:
   * @param date the date reference (Date).
   *
   * ### Methods:
   *
   * #### `short`:
   * Short formatted date string with the format of "MMM dd, yyyy"
   *
   * @param locale in which local to return the date. Defaults to "en-US"
   * @returns Date
   *
   * #### `diff`:
   * Return the time passed from <date> until now as the number of
   * seconds, minutes, hours, days, weeks or years- depends on the
   * difference size.
   * * Up to 1 minutes, the output is "#sec".
   * * Up to 1 hour, the output is "#min".
   * * Up to 1 day, the output is "#h".
   * * Up to 1 week, the output is "#d".
   * * Up to 1 year, the output is "#w".
   * * Over 1 year, the output is "#y".
   * @returns string
   *
   * #### Example:
   * formatDate(new Date()).short("de-DE");
   *
   * formatDate(new Date()).diff();
   */
  public formattedTime(date: Date | number): { short: (locale: string) => string; diff: (locale?: string, withoutSuffix?: boolean) => string } {
    const _date = new Date(date);

    return {
      short: (locale = 'en-US') => _date.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' }),
      diff: (locale = 'en-custom', withoutSuffix = true) => {
        if (!date) return '-';
        return moment(date).locale(locale).fromNow(withoutSuffix);
      },
    };
  }
  /**
   * Trying here to keep everything in local timezone with option to translate into UTC when formating as a string.
   * The utc option will only control how toString() behaves, and only when using moment's toString.
   *
   * Note that javascript toString() always displays in local timezone.
   *
   * Datetime values are always formatted by the JSON serializer into strings, coming and going at either end.
   * Coming from the server into the client, when converted to objects, they remain as
   * string values unless manually converted to Dates (note the column sorting algorithm,
   * at this writing, assumes they have not been converted!).
   *
   * More regarding JSON datetimes:
   *
   * The javascript JSON serializer always converts date representations into a string representation in UTC
   * (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toJSON).
   * The JSON format is the date in UTC plus the offset to local, so midnight local would stored as 4AM UTC.
   * That will be deserialized server-side to a C# DateTime with .Kind as utc.  It is unaltered when sent to Sql Server.
   * When retrieving from Sql Server, it comes into C# as a DateTime with Kind as "unspecified".
   * When serialized as such to JSON, it is converted to the webserver's timezone.
   * Since we want to be receiving these in Utc, we must, in automapper,
   * make sure all viewmodel datetimes have Utc as their Kind.
   *
   * Sometimes we do want to pass a real Date as an argument....
   * for some reason it gets serialized using a different format, lacking the Z.
   * (at least with the fetch serialized this is true).
   */
  public createMoment(date?: Date | string, utc = false): Moment {
    return moment.tz(date, utc ? 'Etc/GMT-0' : this.localTimezone);
  }

  private createMomentFromString(str: string, format?: string, utc = false): Moment {
    let m: Moment = moment(str, format, true); // true for strict

    if (utc) {
      m = this.momentToUTC(m);
    }

    return m;
  }

  private createMomentFromTicks(ticks: number, utc = false): Moment {
    let m: Moment = moment(ticks);

    if (utc) {
      m = this.momentToUTC(m);
    }

    return m;
  }

  /**
   * Convert moment so a toString() will show UTC time, not local.
   * Does not affect the actual earth-time value at all, just the time as
   * one would see it at the same earth-time moment in the UTC timezone.
   * @param m
   */
  private momentToUTC(m: Moment): Moment {
    return m.utc();
  }
}

function shouldStopOnLargest2(largestCounter: number) {
  return largestCounter === 2;
}

function is2ndLargest(largestCounter: number) {
  return largestCounter === 1;
}

interface IFormat {
  key: string;
  format: string;
}

export interface IFormatParameters {
  format?: string;
  // see notes above about utc
  utc?: boolean;
}

export enum TimespanResolution {
  /**
   * show only the largest 2 units, down to the resolution or'd with this
   */
  largest2 = 0x40,
  /**
   * show only the largest units, down to the resolution or'd with this
   */
  largest = 0x20,
  days = 0x10,
  hours = 0x8,
  minutes = 0x4,
  seconds = 0x2,
  milliseconds = 0x1,
}
