import { isDev } from './../environment-variables';
/* eslint-disable no-console */
import { EthereumService } from './ethereum-service';

export function startTimer(label: string): void {
  if (EthereumService.targetedNetwork !== 'Celo' || isDev) {
    console.time(label);
  }
}

export function endTimer(label: string): void {
  if (EthereumService.targetedNetwork !== 'Celo' || isDev) {
    console.timeEnd(label);
  }
}
