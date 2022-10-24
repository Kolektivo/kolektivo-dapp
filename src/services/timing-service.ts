/* eslint-disable no-console */
import { DI, IContainer, Registration } from 'aurelia';
import { IConfiguration } from 'configurations/configuration';

export type ITimingService = TimingService;
export const ITimingService = DI.createInterface<ITimingService>('TimingService');
export class TimingService {
  public static register(container: IContainer) {
    Registration.singleton(ITimingService, TimingService).register(container);
  }

  constructor(@IConfiguration private readonly config: IConfiguration) {}

  public startTimer(label: string): void {
    if (this.config.isDevelopment) {
      console.time(label);
    }
  }

  public endTimer(label: string): void {
    if (this.config.isDevelopment) {
      console.timeEnd(label);
    }
  }
}
