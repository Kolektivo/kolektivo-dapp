import { DI, IContainer, Registration } from 'aurelia';
import { IConfiguration } from 'configurations/configuration';

export type ITimingService = TimingService;
export const ITimingService = DI.createInterface<ITimingService>('TimingService');
export class TimingService {
  constructor(@IConfiguration private readonly configuration: IConfiguration) {}

  public static register(container: IContainer) {
    Registration.singleton(ITimingService, TimingService).register(container);
  }

  public startTimer(label: string): void {
    if (this.configuration.isDevelopment) {
      console.time(label);
    }
  }

  public endTimer(label: string): void {
    if (this.configuration.isDevelopment) {
      console.timeEnd(label);
    }
  }
}
