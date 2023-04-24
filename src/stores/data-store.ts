import { DI, IContainer, Registration } from 'aurelia';

import { IFirebaseService } from '../services/firebase-service';

import { FieldPath, WhereFilterOp } from 'firebase/firestore/lite';

export type IDataStore = DataStore;
export const IDataStore = DI.createInterface<IDataStore>('DataStore');

export type WhereClause = {
  fieldPath: string | FieldPath;
  opStr: WhereFilterOp;
  value: unknown;
};

export class DataStore {
  constructor(@IFirebaseService private readonly firebaseService: IFirebaseService) {}

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IDataStore, DataStore));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getDocs<T = unknown>(...params: Parameters<IFirebaseService['getDocs']>): Promise<T> {
    return this.firebaseService.getDocs(...params);
  }
}
