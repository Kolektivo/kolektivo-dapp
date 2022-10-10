import { CollectionReference, collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore/lite';
import { ITreasuryStore } from './stores/treasury-store';
import { appContainer } from 'app-container';
import { initializeApp } from 'firebase/app';

enum Periods {
  'minute',
  'hour',
  'day',
}

export const seed = async () => {
  let dataCaptured = false;
  const minuteInterval = 5;
  const hourInterval = 1;
  const dayInterval = 1;
  let kttValue = '';
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

  const periods = Object.values(Periods)
    .filter((y) => typeof y === 'number')
    .map((y) => y as Periods);

  const getLastSyncTime = async (interval: string): Promise<string> => {
    const lastSync = collection(database, `chartData/lastSync/${interval}`);
    const lastSyncDocs = await getDocs(lastSync);
    return lastSyncDocs.docs[0]?.id;
  };
  const setLastSyncTime = async (period: string, time: number, prevDocName?: string): Promise<void> => {
    if (prevDocName) {
      //if a doc exists for last sync time for this interval then delete it
      await deleteDoc(doc(database, `chartData/lastSync/${period}/${prevDocName}`));
    }
    //add a doc for the last sync time for the given interval
    await setDoc(doc(database, `chartData/lastSync/${period}`, time.toString()), {});
  };
  const addData = async (document: string, period: string, time: number, value: string): Promise<void> => {
    await setDoc(doc(database, `chartData/${document}/${period}`, time.toString()), { value: value });
  };
  const getTreasuryValue = async (): Promise<string> => {
    const treasuryStore = appContainer.get(ITreasuryStore);
    const treasuryContract = treasuryStore.getTreasuryContract();
    return (await treasuryContract?.totalValuation())?.toHexString() ?? '';
  };
  const captureData = async () => {
    kttValue = await getTreasuryValue();
    dataCaptured = true;
  };
  //loop through each time period to determine if data needs to be collected for it
  await Promise.all(
    periods.map(async (period): Promise<void> => {
      const lastSync = await getLastSyncTime(Periods[period]); //get last sync time for this period from firebase
      const now = new Date();
      let lastSyncTime = now;
      if (lastSync) {
        lastSyncTime = new Date(Number(lastSync));
      }
      let newSyncTime = lastSyncTime;
      if (period === Periods.minute) {
        newSyncTime.setMinutes(newSyncTime.getMinutes() + minuteInterval); // increase the time by the period
        newSyncTime.setSeconds(0, 0);
      } else if (period === Periods.hour) {
        newSyncTime.setHours(newSyncTime.getHours() + hourInterval); // increase the time by the period
        newSyncTime.setMinutes(0, 0, 0);
      } else {
        newSyncTime.setDate(newSyncTime.getDate() + dayInterval); // increase the time by the period
        newSyncTime.setHours(0, 0, 0, 0);
      }
      if (now >= newSyncTime) {
        //current time is past the new sync time so get the closest interval based on period to the current time
        if (period === Periods.minute) {
          //get the nearest minute based on the minuteInterval variable
          const minuteCoeff = 1000 * 60 * minuteInterval;
          newSyncTime = new Date(Math.floor(now.getTime() / minuteCoeff) * minuteCoeff);
        } else if (period === Periods.hour) {
          //set new sync time to now but with the minutes, seconds and ms = 0
          newSyncTime = now;
          newSyncTime.setMinutes(0, 0, 0);
        } else {
          //set new sync time to now but with the hours, minutes, seconds and ms = 0
          newSyncTime = now;
          newSyncTime.setHours(0, 0, 0, 0);
        }

        //capture data for the new interval
        if (!dataCaptured) {
          //only capture data once even if more than one period needs it because it's the same data for more than on period
          await captureData();
        }
        await addData('ktt', Periods[period], newSyncTime.getTime(), kttValue);
        await setLastSyncTime(Periods[period], newSyncTime.getTime(), lastSync); //set latest sync time
      }
      return;
    }),
  );

  //const ktt = collection(database, 'chartData/ktt/1h');

  //Check the timestamp of the most recent stored data point
  //Get and store current KTT value

  //Get and store current Reserve value

  //Get and store current kCur leverage ratio

  //Get and store current kCur Price

  //Get and store current kCur Supply Distribution

  //Get and store current Risk Value

  //Get and store current kGuilder-kCur Value Ratio

  //const data = await getDocs(query(chartData));
  //const data = await getDocs(query(chartData, where('chart', '==', 'ktt'), where('interval', '==', '1h')));

  // console.log(
  //   'data',
  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  //   data.docs.map((x) => ({ timeStamp: x.id, value: x.data().value })),
  // );

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
