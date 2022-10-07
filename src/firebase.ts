import { CollectionReference, Timestamp, collection, doc, getDoc, getDocs, getFirestore, query } from 'firebase/firestore/lite';
import { initializeApp } from 'firebase/app';

export const seed = async () => {
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

  const chartData = collection(database, 'chartData');
  const lastSync = doc(chartData, 'lastSync');
  const ktt = collection(database, 'chartData/ktt/1h');

  //Check the timestamp of the most recent stored data point
  const lastSyncTime = (await getDoc(lastSync)).data();
  console.log(lastSyncTime && new Timestamp(lastSyncTime.syncTime.seconds as number, lastSyncTime.syncTime.nanoseconds as number).toDate());
  //Get and store current KTT value

  //Get and store current Reserve value

  //Get and store current kCur leverage ratio

  //Get and store current kCur Price

  //Get and store current kCur Supply Distribution

  //Get and store current Risk Value

  //Get and store current kGuilder-kCur Value Ratio

  const data = await getDocs(query(chartData));
  //const data = await getDocs(query(chartData, where('chart', '==', 'ktt'), where('interval', '==', '1h')));

  console.log(
    'data',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    data.docs.map((x) => ({ timeStamp: x.id, value: x.data().value })),
  );

  //console.log('data', data.docs);

  // const c = Contracts.Monetary.main.contracts.Treasury;

  // const logs = await defaultProvider.getLogs({
  //   fromBlock: 0,
  //   address: c.address,
  // });

  // const iface = new Interface(c.abi);

  // const batch = writeBatch(database);
  // const currentTime = new Date();
  // const results = await Promise.all(
  //   logs
  //     .filter((a, y) => y === 0)
  //     .map(
  //       (y) => defaultProvider.getBlock(y.blockNumber).catch((e) => console.log(e)),
  //       // .map(async (y) => {
  //       //   const data = iface.parseLog(y);
  //       //   const args: Record<string, unknown> = {};
  //       //   const params = Object.keys(data.args)
  //       //     .filter((x) => isNaN(Number(x)))
  //       //     // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
  //       //     .forEach((y) => (args[y] = data.args[y]));
  //       //   batch.set(doc(events), {
  //       //     contract: 'Kolektivo Treasury Token',
  //       //     token: 'KTT',
  //       //     args: args,
  //       //     name: data.name,
  //       //     timestamp: await defaultProvider.getBlock(y.blockNumber),
  //       //     createDate: currentTime,
  //       //   });
  //       // }),
  //     ),
  // );
  // console.log(results);
  // await batch.commit();

  // const start = await getDocs(
  //   query(events, where('transactionTime', '<=', new Date('10/04/2022')), where('transactionTime', '>=', new Date('10/01/2022')), limit(1)),
  // );

  // const end = await getDocs(query(events, where('createDate', '>=', new Date('10/01/2022')), limit(1)));
  // const result = await getDocs(query(events, orderBy('createDate'), startAt(start.docs[0]), endAt(end.docs[0])));
};
function ref(lastSync: CollectionReference): import('firebase/firestore/lite').CollectionReference<unknown> {
  throw new Error('Function not implemented.');
}
