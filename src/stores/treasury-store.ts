import { DI, IContainer, Registration } from 'aurelia';

export type ITreasuryStore = TreasuryStore;
export const ITreasuryStore = DI.createInterface<ITreasuryStore>('TreasuryStore');

export class TreasuryStore {
  public static register(container: IContainer): void {
    container.register(Registration.singleton(ITreasuryStore, TreasuryStore));
  }
}
