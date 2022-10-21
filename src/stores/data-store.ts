import { DI, IContainer, Registration } from 'aurelia';
import { IFirebaseService } from './../services/firebase-service';

export type IDataStore = DataStore;
export const IDataStore = DI.createInterface<IDataStore>('DataStore');

export class DataStore {
  public static register(container: IContainer): void {
    container.register(Registration.singleton(IDataStore, DataStore));
  }

  constructor(@IFirebaseService private readonly firebaseService: IFirebaseService) {}

  public async getDocs<T = unknown>(...params: Parameters<IFirebaseService['getDocs']>): Promise<T> {
    return this.firebaseService.getDocs<T>(...params);
  }
}
