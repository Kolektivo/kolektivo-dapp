import { DI, IContainer, Registration } from 'aurelia';
import {
  FieldPath,
  Firestore,
  OrderByDirection,
  WhereFilterOp,
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from 'firebase/firestore/lite';
import { FirebaseApp } from '@firebase/app';

export type IFirebaseApp = FirebaseApp;
export const IFirebaseApp = DI.createInterface<FirebaseApp>();

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

  private fireStore: Firestore;
  constructor(@IFirebaseApp private readonly app: IFirebaseApp) {
    this.fireStore = getFirestore(this.app);
  }

  public async getDocs<T = unknown>(path: string, order: string | FieldPath, direction: OrderByDirection, whereClause: WhereClause): Promise<T> {
    const data = await getDocs(
      query(collection(this.fireStore, path), where(whereClause.fieldPath, whereClause.opStr, whereClause.value), orderBy(order, direction)),
    );
    return data.docs.map((x) => x.data()) as T;
  }
}
