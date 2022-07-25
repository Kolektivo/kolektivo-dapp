import { DI, IContainer, Registration } from 'aurelia';

export type IUtils = Utils;
export const IUtils = DI.createInterface<IUtils>('Utils');
export class Utils {
  public static extractExceptionMessage(ex: any): string {
    return ex?.error?.message ?? ex?.reason ?? ex?.message ?? ex;
  }

  /**
   * remove precision from the decimals part. Need this because toFixed adds phantom numbers with decimals > 16
   * @param num
   * @returns
   */
  public static truncateDecimals(num: number, decimals: number): number {
    if (num === undefined || num === null || Number.isInteger(num) || isNaN(num)) {
      return num;
    }
    const parts = num.toString().split('.');
    return Number(`${parts[0]}.${parts[1].slice(0, decimals)}`);
  }

  public static register(container: IContainer) {
    Registration.singleton(IUtils, Utils).register(container);
  }
}
