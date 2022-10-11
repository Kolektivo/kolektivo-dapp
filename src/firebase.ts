import { CollectionReference, collection, deleteDoc, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore/lite';
import { DI, IEventAggregator, ILogger, IObserverLocator, Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { IIpfsService, INumberService, Services, fromWei } from 'services';
import { IReserveStore } from './stores/reserve-store';
import { ITreasuryStore } from './stores/treasury-store';
import { Store } from 'stores';
import { initializeApp } from 'firebase/app';

enum Periods {
  'minute',
  'hour',
  'day',
}

const container = DI.createContainer()
  .register(Registration.instance(IIpfsService, {}))
  .register(Services)
  .register(Store)
  .register(
    Registration.instance(I18N, {}),
    Registration.instance(IObserverLocator, {}),
    Registration.instance(IEventAggregator, {}),
    Registration.instance(ILogger, { scopeTo: () => {} }),
  );

export const seed = async () => {
  let dataCaptured = false;
  const minuteInterval = 5;
  const hourInterval = 1;
  const dayInterval = 1;
  let kttValue = '';
  const numberService: INumberService = container.get(INumberService);
  const reserveStore: IReserveStore = container.get(IReserveStore);
  let reserveValue = '';
  let leverageRatio = 0;
  let kCurPrice = 0;
  let kCurReserveDistribution = 0;
  let kCurMentoDistribution = 0;
  let kCurPrimaryPoolDistribution = 0;
  let kCurCirculatingDistribution = 0;
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
  const addData = async (document: string, period: string, time: number, value: string | number | object): Promise<void> => {
    await setDoc(doc(database, `chartData/${document}/${period}`, time.toString()), { value: value });
  };
  const getTreasuryValue = async (): Promise<string> => {
    const treasuryStore = container.get(ITreasuryStore);
    const treasuryContract = treasuryStore.getTreasuryContract();
    return (await treasuryContract?.totalValuation())?.toHexString() ?? '';
  };
  const loadReserveData = async (): Promise<void> => {
    await reserveStore.loadAssets(); //loads reserve value and assets
    await reserveStore.loadkCur(); //loads kCur and the supply distributions
  };
  const captureData = async () => {
    //Get current KTT (Treasury) value
    kttValue = await getTreasuryValue();

    //Get current Reserve value
    await loadReserveData();
    reserveValue = reserveStore.reserveValuation?.toHexString() ?? '';

    //Get current kCur leverage ratio
    leverageRatio = numberService.fromString(fromWei(reserveStore.backing ?? 0, 2));

    //Get current kCur Price
    kCurPrice = reserveStore.kCurPrice ?? 0;

    //Get current kCur Supply Distribution
    kCurReserveDistribution = reserveStore.kCurReserveDistribution ?? 0;
    kCurMentoDistribution = reserveStore.kCurMentoDistribution ?? 0;
    kCurPrimaryPoolDistribution = reserveStore.kCurPrimaryPoolDistribution ?? 0;
    kCurCirculatingDistribution = reserveStore.kCurCirculatingDistribution;

    //Get and store current Risk Value

    //Get and store current kGuilder-kCur Value Ratio

    dataCaptured = true;
  };
  //loop through each time period to determine if data needs to be collected for it
  await Promise.all(
    periods.map(async (period): Promise<void> => {
      const lastSync = await getLastSyncTime(Periods[period]); //get last sync time for this period from firebase
      const now = new Date();
      let lastSyncTime = new Date();
      if (lastSync) {
        lastSyncTime = new Date(Number(lastSync));
      }
      if (period === Periods.minute) {
        lastSyncTime.setMinutes(lastSyncTime.getMinutes() + minuteInterval); // increase the time by the period
        lastSyncTime.setSeconds(0, 0);
      } else if (period === Periods.hour) {
        lastSyncTime.setHours(lastSyncTime.getHours() + hourInterval); // increase the time by the period
        lastSyncTime.setMinutes(0, 0, 0);
      } else {
        lastSyncTime.setDate(lastSyncTime.getDate() + dayInterval); // increase the time by the period
        lastSyncTime.setHours(0, 0, 0, 0);
      }
      if (now >= lastSyncTime) {
        let newSyncTime = new Date();
        //current time is past the new sync time so get the closest interval based on period to the current time
        if (period === Periods.minute) {
          //get the nearest minute based on the minuteInterval variable
          const minuteCoeff = 1000 * 60 * minuteInterval;
          newSyncTime = new Date(Math.floor(now.getTime() / minuteCoeff) * minuteCoeff);
        } else if (period === Periods.hour) {
          //set new sync time to now but with the minutes, seconds and ms = 0
          newSyncTime.setMinutes(0, 0, 0);
        } else {
          //set new sync time to now but with the hours, minutes, seconds and ms = 0
          newSyncTime.setHours(0, 0, 0, 0);
        }

        //capture data for the new interval
        if (!dataCaptured) {
          //only capture data once even if more than one period needs it because it's the same data for more than on period
          await captureData();
        }

        await addData('kCurPrice', Periods[period], newSyncTime.getTime(), kCurPrice);
        await addData('kCurRatio', Periods[period], newSyncTime.getTime(), leverageRatio);
        //await addData('kCurSupply', Periods[period], newSyncTime.getTime(), leverageRatio);

        await addData('ktt', Periods[period], newSyncTime.getTime(), kttValue);
        await addData('reserve', Periods[period], newSyncTime.getTime(), reserveValue);
        await setLastSyncTime(Periods[period], newSyncTime.getTime(), lastSync); //set latest sync time
      }
      return;
    }),
  );

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
