/**
 * Remove precision from the decimals part of a number. Need this instead of `toFixed` because
 * the latter adds phantom numbers with decimals > 16
 * @param num
 * @returns
 */
export function truncateDecimals(num: number, decimals: number): number {
  if (typeof num !== 'number' || Number.isInteger(num) || isNaN(num)) {
    return num;
  }
  const parts = num.toString().split('.');
  return Number(`${parts[0]}.${parts[1].slice(0, decimals)}`);
}

/**
 * returns "0x12345678[n]4567890" as "0x1234...7890"
 * @param str
 * @returns
 */
export function smallHexString(str: string): string {
  if (!str) {
    return '';
  }
  const len = str.length;
  return `${str.slice(0, 6)}...${str.slice(len - 4, len)}`;
}

export function delay(time: number): Promise<void> {
  let resolve: (() => void) | undefined = undefined;
  const promise = new Promise<void>((res) => {
    resolve = res;
  });
  setTimeout(() => {
    resolve?.();
  }, time);
  return promise;
}
type ErrorType = string | { message?: string };
export const getErrorMessage = (error: ErrorType | unknown) => {
  const knownError = error as ErrorType;
  return typeof knownError === 'string' ? knownError : knownError.message ?? '';
};
