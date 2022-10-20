import { DI, IContainer, Registration } from 'aurelia';
import { FieldPath, OrderByDirection, WhereFilterOp, collection, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore/lite';

import { initializeApp } from 'firebase/app';

export type IDataStore = DataStore;
export const IDataStore = DI.createInterface<IDataStore>('DataStore');

export type WhereClause = {
  fieldPath: string | FieldPath;
  opStr: WhereFilterOp;
  value: unknown;
};

export class DataStore {
  private firebaseConfig = {
    apiKey: 'AIzaSyCItD_gHaRvRrd8evJtFKPALsZLY1EkHe4',
    authDomain: 'kolektivo-36b63.firebaseapp.com',
    projectId: 'kolektivo-36b63',
    storageBucket: 'kolektivo-36b63.appspot.com',
    messagingSenderId: '324595180464',
    appId: '1:324595180464:web:69e6b83cdba3bf2d30ac75',
    measurementId: 'G-7BSHV1Y6VS',
  };
  private app = initializeApp(this.firebaseConfig);
  private database = getFirestore(this.app);
  public static register(container: IContainer): void {
    container.register(Registration.singleton(IDataStore, DataStore));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getDocs<T = unknown>(path: string, order: string | FieldPath, direction: OrderByDirection, whereClause: WhereClause): Promise<T> {
    const data = await getDocs(
      query(collection(this.database, path), where(whereClause.fieldPath, whereClause.opStr, whereClause.value), orderBy(order, direction)),
    );
    return data.docs.map((x) => x.data()) as T;
  }
}
