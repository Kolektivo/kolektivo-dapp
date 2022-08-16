/* eslint-disable no-console */
import { EthereumService } from './ethereum-service';

export function startTimer(label: string): void {
  if (EthereumService.targetedNetwork !== 'mainnet' || process.env.NODE_ENV === 'development') {
    console.time(label);
  }
}

export function endTimer(label: string): void {
  if (EthereumService.targetedNetwork !== 'mainnet' || process.env.NODE_ENV === 'development') {
    console.timeEnd(label);
  }
}
