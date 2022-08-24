import { DI, IContainer, Registration } from 'aurelia';
import { callOnce } from '../decorators/call-once';
import { isDev } from './../environment-variables';
/* eslint-disable no-console */
import { Networks } from './ethereum-service';

export type ITimingService = TimingService;
export const ITimingService = DI.createInterface<ITimingService>('TimingService');
export class TimingService {
  public static register(container: IContainer) {
    Registration.singleton(ITimingService, TimingService).register(container);
  }

  private targetedNetwork?: AllowedNetworks;

  @callOnce('Timing Service')
  public initialize(network: AllowedNetworks): void {
    this.targetedNetwork = network;
  }

  public startTimer(label: string): void {
    if (this.targetedNetwork !== Networks.Celo || isDev) {
      console.time(label);
    }
  }

  public endTimer(label: string): void {
    if (this.targetedNetwork !== Networks.Celo || isDev) {
      console.timeEnd(label);
    }
  }
}
