import { valueConverter } from 'aurelia';
const t = new Intl.RelativeTimeFormat(undefined);

@valueConverter('relativeTime')
export class RelativeTime {
  public toView(value?: number | string): string | null {
    if (!value) return 'never';
    const result = this.timeDiff(new Date(), new Date(value));
    return t.format(result.difference * -1, result.scale);
  }
  private timeDiff(curr: Date | string, prev: Date | string): { difference: number; scale: 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year' } {
    curr = new Date(curr);
    prev = new Date(prev);

    const ms_Min = 60 * 1000; // milliseconds in Minute
    const ms_Hour = ms_Min * 60; // milliseconds in Hour
    const ms_Day = ms_Hour * 24; // milliseconds in day
    const ms_Mon = ms_Day * 30; // milliseconds in Month
    const ms_Yr = ms_Day * 365; // milliseconds in Year
    const diff = Number(curr) - Number(prev); //difference between dates.

    if (diff < ms_Min) {
      return { difference: Math.round(diff / 1000), scale: 'second' };
    }
    if (diff < ms_Hour) {
      return { difference: Math.round(diff / ms_Min), scale: 'minute' };
    }
    if (diff < ms_Day) {
      return { difference: Math.round(diff / ms_Hour), scale: 'hour' };
    }
    if (diff < ms_Mon) {
      return { difference: Math.round(diff / ms_Day), scale: 'day' };
    }
    if (diff < ms_Yr) {
      return { difference: Math.round(diff / ms_Mon), scale: 'month' };
    }
    return { difference: Math.round(diff / ms_Yr), scale: 'year' };
  }
}
