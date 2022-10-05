import { Contracts, defaultProvider } from 'services/contract';
import { Interface } from 'ethers/lib/utils';
import { collection, doc, endAt, getDocs, getFirestore, limit, orderBy, query, startAt, where, writeBatch } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAmcBzOuKPoswcKAZDabJ42dyN6EL-7Gw0',
  authDomain: 'kolektivo-613ca.firebaseapp.com',
  projectId: 'kolektivo-613ca',
  storageBucket: 'kolektivo-613ca.appspot.com',
  messagingSenderId: '566529978919',
  appId: '1:566529978919:web:0109b91d371b892db5d402',
  measurementId: 'G-FNM37RE6TB',
};
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const events = collection(database, 'events');

const c = Contracts.Monetary.main.contracts.Treasury;

const logs = await defaultProvider.getLogs({
  fromBlock: 0,
  address: c.address,
});

const iface = new Interface(c.abi);

const batch = writeBatch(database);
const currentTime = new Date();
await Promise.all(
  logs
    .filter((a, y) => y === 0)
    .map(async (y) => {
      const data = iface.parseLog(y);
      const args: Record<string, unknown> = {};
      const params = Object.keys(data.args)
        .filter((x) => isNaN(Number(x)))
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
        .forEach((y) => (args[y] = data.args[y]));
      batch.set(doc(events), {
        contract: 'Kolektivo Treasury Token',
        token: 'KTT',
        args: args,
        name: data.name,
        // timestamp: (await defaultProvider.getBlock(-20)).timestamp,
        createDate: currentTime,
      });
    }),
);

await batch.commit();

const start = await getDocs(
  query(events, where('transactionTime', '<=', new Date('10/04/2022')), where('transactionTime', '>=', new Date('10/01/2022')), limit(1)),
);

const end = await getDocs(query(events, where('createDate', '>=', new Date('10/01/2022')), limit(1)));
const result = await getDocs(query(events, orderBy('createDate'), startAt(start.docs[0]), endAt(end.docs[0])));
