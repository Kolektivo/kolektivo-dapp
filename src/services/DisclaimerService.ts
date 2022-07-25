import { Address } from './types';
import { DI, IContainer, Registration } from 'aurelia';
import { IBrowserStorageService } from './BrowserStorageService';
import { INotificationService } from '../../design-system/services/notification-service';

export type IDisclaimerService = DisclaimerService;
export const IDisclaimerService = DI.createInterface<IDisclaimerService>('DisclaimerService');

export class DisclaimerService {
  constructor(
    @INotificationService private readonly notificationService: INotificationService,
    @IBrowserStorageService private readonly storageService: IBrowserStorageService,
  ) {}

  public isDappDisclaimed(accountAddress: Address): boolean {
    return (
      accountAddress && this.storageService.lsGet(this.getDappDisclaimerStatusKey(accountAddress), 'false') === 'true'
    );
  }

  public async ensureDappDisclaimed(account: string): Promise<boolean> {
    if (!this.isDappDisclaimed(account)) {
      const accepted = await this.disclaimDapp(account);
      if (accepted) {
        this.storageService.lsSet(this.getDappDisclaimerStatusKey(account), 'true');
      } else {
        return false;
      }
    }
    return true;
  }

  public showDisclaimer(message: string): Promise<any> {
    return this.notificationService.confirm(message);
  }

  private getDappDisclaimerStatusKey(accountAddress: Address): string {
    return `disclaimer-${accountAddress}`;
  }

  private async disclaimDapp(accountAddress: string): Promise<boolean> {
    let disclaimed = false;

    if (this.isDappDisclaimed(accountAddress)) {
      disclaimed = true;
    } else {
      disclaimed = await this.showDisclaimer('This is the disclaimer');
    }
    return disclaimed;
  }

  public static register(container: IContainer) {
    Registration.singleton(IDisclaimerService, DisclaimerService).register(container);
  }
}
