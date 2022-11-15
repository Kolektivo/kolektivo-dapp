import { DI, IContainer, Registration } from 'aurelia';

import { type FirebaseApp } from '@firebase/app';
import type { FieldPath, Firestore, OrderByDirection, WhereFilterOp } from 'firebase/firestore/lite';

export type IFirebaseApp = Promise<FirebaseApp> | FirebaseApp;
export const IFirebaseApp = DI.createInterface<IFirebaseApp>();

export type IFirebaseService = FirebaseService;
export const IFirebaseService = DI.createInterface<IFirebaseService>();

export type WhereClause = {
  fieldPath: string | FieldPath;
  opStr: WhereFilterOp;
  value: unknown;
};

export class FirebaseService {
  public static register(container: IContainer): void {
    container.register(Registration.singleton(IFirebaseService, FirebaseService));
  }

  public fireStore?: Firestore;
  constructor(@IContainer private readonly container: IContainer) {}

  public async connect() {
    const { getFirestore } = await import('firebase/firestore/lite');
    this.fireStore ??= getFirestore(await this.container.get(IFirebaseApp));
    return this.fireStore;
  }

  public async getDocs<T = unknown>(path: string, order: string | FieldPath, direction: OrderByDirection, whereClause: WhereClause): Promise<T> {
    const { getDocs, query, collection, where, orderBy } = await import('firebase/firestore/lite');
    const data = await getDocs(
      query(collection(await this.connect(), path), where(whereClause.fieldPath, whereClause.opStr, whereClause.value), orderBy(order, direction)),
    );
    return data.docs.map((x) => x.data()) as T;
  }
}
