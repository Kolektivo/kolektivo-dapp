import { collection, doc, endAt, getDocs, getFirestore, limit, orderBy, query, setDoc, startAt, where } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const events = collection(database, 'events');
await setDoc(doc(events), {
  test: 'OLD',
  createDate: new Date('9/1/2021'),
});

const start = await getDocs(
  query(events, where('createDate', '<=', new Date('10/04/2022')), where('createDate', '>=', new Date('10/01/2022')), limit(1)),
);
const end = await getDocs(query(events, where('createDate', '>=', new Date('10/01/2022')), limit(1)));
const result = await getDocs(query(events, orderBy('createDate'), startAt(start.docs[0]), endAt(end.docs[0])));
