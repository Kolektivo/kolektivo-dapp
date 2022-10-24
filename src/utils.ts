import { BigNumber } from '@ethersproject/bignumber';
import { Interval } from 'models/interval';
import { getAddress } from 'ethers/lib/utils';

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

/**
 * null, undefined, '' and '0x0[...]' would be treated as empty.
 * '0x' would be treated as not an address.
 * @param address
 * @param emptyOk
 * @returns
 */
export function isAddress(address?: string | null, emptyOk = false): boolean {
  try {
    if (!address?.trim() || BigNumber.from(address).eq(0)) {
      return emptyOk;
    } else {
      return !!getAddress(address);
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
  return false;
}

export function convertIntervalToRecordType(interval: Interval): string {
  switch (interval) {
    case Interval['1d']:
      return 'hour';
    case Interval['1h']:
      return 'minute';
    case Interval['1m']:
    case Interval['1w']:
    case Interval['1y']:
      return 'day';
  }
}

export function getTimeMinusInterval(interval: Interval): number {
  const now = new Date();
  switch (interval) {
    case Interval['1h']:
      now.setMinutes(now.getMinutes() - 60);
      break;
    case Interval['1d']:
      now.setHours(now.getHours() - 24);
      break;
    case Interval['1w']:
      now.setDate(now.getDate() - 7);
      break;
    case Interval['1m']:
      now.setMonth(now.getMonth() - 1);
      break;
    case Interval['1y']:
      now.setFullYear(now.getFullYear() - 1);
      break;
  }
  return now.getTime();
}

export const formatter = new Intl.DateTimeFormat(undefined, {
  timeStyle: 'short',
  dateStyle: 'short',
});

export const formatString = (string: string, placeholders: Record<string | number, unknown>) => {
  for (const propertyName in placeholders) {
    const re = new RegExp('{' + propertyName + '}', 'gm');
    string = string.replace(re, placeholders[propertyName] as string);
  }
  return string;
};
