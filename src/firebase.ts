import { configurationFromEnv } from 'configurations/configuration';
/* eslint-disable no-console */
import { CacheService } from './services/cache-service';
import { ContractService } from './services/contract/contract-service';
import { ContractStore } from './stores/contract-store';
import { DI, IEventAggregator, ILogger, IObserverLocator, Registration } from 'aurelia';
import { DataStore } from './stores/data-store';
import { EthereumService } from 'services/ethereum-service';
import { FirebaseService } from './services/firebase-service';
import { I18N } from '@aurelia/i18n';
import { IBrowserStorageService } from 'services/browser-storage-service';
import { IFirebaseApp, IFirebaseService } from 'services/firebase-service';
import { IIpfsService } from 'services/ipfs';
import { IReserveStore, ReserveStore } from 'stores/reserve-store';
import { ITokenData, getTokenInfos } from 'services/contract';
import { ITreasuryStore, TreasuryStore } from './stores/treasury-store';
import { NumberService } from './services/number-service';
import { TokenService } from './services/token-service';
import { collection, deleteDoc, doc, getDocs, query, setDoc, where, writeBatch } from 'firebase/firestore/lite';
import { firebaseConfig } from 'configurations/firebase';
import { initializeApp } from 'firebase/app';

enum Periods {
  'minute',
  'hour',
  'day',
}

const container = DI.createContainer()
  .register(Registration.instance(IFirebaseApp, initializeApp(firebaseConfig)))
  .register(Registration.instance(IIpfsService, {}))
  .register(ContractService)
  .register(EthereumService)
  .register(Registration.instance(IBrowserStorageService, { lsGet: () => '', lsSet: () => '' }))
  .register(FirebaseService)
  .register(ContractStore)
  .register(TokenService)
  .register(DataStore)
  .register(configurationFromEnv())
  .register(CacheService)
  .register(TreasuryStore)
  .register(ReserveStore)
  .register(
    Registration.instance(ITokenData, {
      tokens: getTokenInfos(),
    }),
  )
  .register(NumberService)
  .register(Registration.instance(I18N, { uf: (s: unknown) => Number(s) }))
  .register(
    Registration.instance(IObserverLocator, {}),
    Registration.instance(IEventAggregator, {}),
    Registration.instance(ILogger, {
      scopeTo: () => {
        // blah
      },
    }),
  );

export const seed = async () => {
  let dataCaptured = false;
  const minuteInterval = 5;
  const hourInterval = 1;
  const dayInterval = 1;
  let kttValue = '';
  // const numberService: INumberService = container.get(INumberService);
  const reserveStore: IReserveStore = container.get(IReserveStore);
  let reserveValue = '';
  let leverageRatio = 0;
  let minLeverageRatio = 0;
  let maxLeverageRatio = 0;
  let kCurPrice = 0;
  let kCurReserveDistribution = 0;
  let kCurMentoDistribution = 0;
  let kCurPrimaryPoolDistribution = 0;
  let kCurCirculatingDistribution = 0;
  let captureDataPromise: Promise<void> | undefined = undefined;

  const service = container.get(IFirebaseService);
  const database = await service.connect();

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
    let objectToSave = value;
    if (typeof objectToSave !== 'object') {
      objectToSave = { value: value };
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (objectToSave as any).createdAt = time;
    await setDoc(doc(database, `chartData/${document}/${period}`, time.toString()), objectToSave);
  };
  const deleteData = async (document: string, period: string, date: number) => {
    const batch = writeBatch(database);
    const docsToDelete = await getDocs(query(collection(database, `chartData/${document}/${period}`), where('createdAt', '<', date)));
    docsToDelete.forEach((x) => batch.delete(x.ref));
    await batch.commit();
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
  const getTimeMinusInterval = (period: Periods): number => {
    const now = new Date();
    switch (period) {
      case Periods.minute:
        now.setMinutes(now.getMinutes() - 60, 0, 0); //get date 60 minutes ago
        break;
      case Periods.hour:
        now.setHours(now.getHours() - 24, 0, 0, 0); //get date 24 hours ago
        break;
      case Periods.day:
        return Number.MIN_VALUE; //never delete day data in case we need a MAX chart
    }
    return now.getTime();
  };
  const captureData = async () => {
    //Get current KTT (Treasury) value
    kttValue = await getTreasuryValue();

    //Get current Reserve value
    await loadReserveData();
    reserveValue = reserveStore.reserveValuation?.toHexString() ?? '';

    //Get current kCur leverage ratio
    leverageRatio = reserveStore.leverageRatio;
    minLeverageRatio = reserveStore.minLeverageRatio;
    maxLeverageRatio = reserveStore.maxLeverageRatio;

    //Get current kCur Price
    kCurPrice = reserveStore.kCurPrice ?? 0;

    //Get current kCur Supply Distribution
    kCurReserveDistribution = reserveStore.kCurReserveDistribution ?? 0;
    kCurMentoDistribution = reserveStore.kCurMentoDistribution ?? 0;
    kCurPrimaryPoolDistribution = reserveStore.kCurPrimaryPoolDistribution ?? 0;
    kCurCirculatingDistribution = reserveStore.kCurCirculatingDistribution;

    //Get and store current Risk Value

    //Get and store current kGuilder-kCur Value Ratio
  };

  //loop through each time period to determine if data needs to be collected for it
  await Promise.all(
    periods.map(async (period): Promise<void> => {
      const lastSync = await getLastSyncTime(Periods[period]); //get last sync time for this period from firebase
      //lastSync = 1666051200000
      const now = new Date();
      let lastSyncTime = new Date();
      if (lastSync) {
        lastSyncTime = new Date(Number(lastSync));
      }
      if (period === Periods.minute) {
        lastSyncTime.setUTCMinutes(lastSyncTime.getUTCMinutes() + minuteInterval); // increase the time by the period
        lastSyncTime.setUTCSeconds(0, 0);
      } else if (period === Periods.hour) {
        lastSyncTime.setUTCHours(lastSyncTime.getUTCHours() + hourInterval); // increase the time by the period
        lastSyncTime.setUTCMinutes(0, 0, 0);
      } else {
        lastSyncTime.setUTCDate(lastSyncTime.getUTCDate() + dayInterval); // increase the time by the period
        lastSyncTime.setUTCHours(0, 0, 0, 0);
      }
      if (now >= lastSyncTime || !lastSync) {
        let newSyncTime = new Date();
        //current time is past the new sync time so get the closest interval based on period to the current time
        if (period === Periods.minute) {
          //get the nearest minute based on the minuteInterval variable
          const minuteCoeff = 1000 * 60 * minuteInterval;
          newSyncTime = new Date(Math.floor(now.getTime() / minuteCoeff) * minuteCoeff);
        } else if (period === Periods.hour) {
          //set new sync time to now but with the minutes, seconds and ms = 0
          newSyncTime.setUTCMinutes(0, 0, 0);
        } else {
          //set new sync time to now but with the hours, minutes, seconds and ms = 0
          newSyncTime.setUTCHours(0, 0, 0, 0);
        }

        //capture data for the new interval
        if (!dataCaptured) {
          dataCaptured = true;
          //only capture data once even if more than one period needs it because it's the same data for more than on period
          captureDataPromise = captureData();
        }

        void captureDataPromise?.then(async () => {
          await addData('kCurPrice', Periods[period], newSyncTime.getTime(), kCurPrice);
          await addData('kCurRatio', Periods[period], newSyncTime.getTime(), { leverageRatio, maxLeverageRatio, minLeverageRatio });
          await addData('kCurSupply', Periods[period], newSyncTime.getTime(), {
            kCurReserveDistribution,
            kCurMentoDistribution,
            kCurPrimaryPoolDistribution,
            kCurCirculatingDistribution,
          });

          await addData('ktt', Periods[period], newSyncTime.getTime(), kttValue);
          await addData('reserve', Periods[period], newSyncTime.getTime(), reserveValue);
          await setLastSyncTime(Periods[period], newSyncTime.getTime(), lastSync); //set latest sync time

          //delete unneeded records for this interval
          const earliestTime = getTimeMinusInterval(period);
          await deleteData('kCurPrice', Periods[period], earliestTime);
          await deleteData('kCurRatio', Periods[period], earliestTime);
          await deleteData('kCurSupply', Periods[period], earliestTime);
          await deleteData('ktt', Periods[period], earliestTime);
          await deleteData('reserve', Periods[period], earliestTime);
        });
      }
      return;
    }),
  );
};

await seed();
