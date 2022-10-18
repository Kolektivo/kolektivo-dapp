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
    apiKey: 'AIzaSyAmcBzOuKPoswcKAZDabJ42dyN6EL-7Gw0',
    authDomain: 'kolektivo-613ca.firebaseapp.com',
    projectId: 'kolektivo-613ca',
    storageBucket: 'kolektivo-613ca.appspot.com',
    messagingSenderId: '566529978919',
    appId: '1:566529978919:web:0109b91d371b892db5d402',
    measurementId: 'G-FNM37RE6TB',
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
