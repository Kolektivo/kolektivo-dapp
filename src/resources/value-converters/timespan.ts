import { valueConverter } from 'aurelia';

@valueConverter('timespan')
export class TimespanValueConverter {
  /**
   * convert between milliseconds in the viewmodel and a string.
   * @param value
   * @param resolution should be a single TimespanResolution value as a string, like "minutes",
   *                   or else or'd numeric flags like 3, as a number.
   * @param largest true as a way of including the TimespanResolution.largest flag, to combine with, say, "hours"
   * @param abbrev for example, "minutes" becomes "min"
   * @returns
   */
  public toView(value: number, resolution?: number | undefined, largest = false, abbrev = false): string | null {
    // this can use built in
    return '';
  }
}
