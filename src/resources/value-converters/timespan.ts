import { IDateService, TimespanResolution } from '../../services/DateService';
import { valueConverter } from 'aurelia';

type TimespanResolutionStrings = keyof typeof TimespanResolution;

@valueConverter('timespan')
export class TimespanValueConverter {
  constructor(@IDateService private readonly dateService: IDateService) {}

  /**
   * convert between milliseconds in the viewmodel and a string.
   * @param value
   * @param resolution should be a single TimespanResolution value as a string, like "minutes",
   *                   or else or'd numeric flags like 3, as a number.
   * @param largest true as a way of including the TimespanResolution.largest flag, to combine with, say, "hours"
   * @param abbrev for example, "minutes" becomes "min"
   * @returns
   */
  public toView(value: number, resolution?: number | TimespanResolutionStrings | undefined, largest = false, abbrev = false): string | null {
    let resolutionEnum: TimespanResolution | undefined = undefined;
    if (typeof resolution === 'number') {
      resolutionEnum = resolution;
    } else if (typeof resolution === 'string') {
      resolutionEnum = TimespanResolution[resolution];
    } else {
      resolutionEnum = resolution; // undefined
    }
    if (typeof resolutionEnum !== 'undefined' && largest) {
      // eslint-disable-next-line no-bitwise
      resolutionEnum |= TimespanResolution.largest;
    }
    return this.dateService.ticksToTimeSpanString(value, resolutionEnum, abbrev);
  }
}
