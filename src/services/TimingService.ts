/* eslint-disable no-console */
import { isDev } from './../environment-variables';

export function startTimer(label: string): void {
  if (isDev) {
    console.time(label);
  }
}

export function endTimer(label: string): void {
  if (isDev) {
    console.timeEnd(label);
  }
}
