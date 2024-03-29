import { SymmetricService } from './services/symmetric-service';
/* eslint-disable no-console */
('use strict');
import { DI, IEventAggregator, ILogger, IObserverLocator, Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';

import './prototypes';

import { IConfiguration } from './configurations/configuration';
import { firebaseConfig } from './configurations/firebase';
import { CacheService } from './services/cache-service';
import { ContractService } from './services/contract/contract-service';
import { ITokenData, tokenData } from './services/contract/token-info';
import { FirebaseService, IFirebaseApp, IFirebaseService } from './services/firebase-service';
import { NumberService } from './services/number-service';
import { TokenService } from './services/token-service';
import { ContractStore } from './stores/contract-store';
import { DataStore } from './stores/data-store';
import { IReserveStore, ReserveStore } from './stores/reserve-store';
import { ITreasuryStore, TreasuryStore } from './stores/treasury-store';
import { CHAIN, CHAIN_ID, CHAIN_URL, FIREBASE_COLLECTION, IPFS_GATEWAY, SCAN_LINK } from './environment-variables';
import { IReadOnlyProvider } from './read-only-provider';
import { EthereumService, IBrowserStorageService, IIpfsService } from './services';
import { IWalletConnector } from './wallet-connector';
import { IWalletProvider } from './wallet-provider';

import { CeloProvider } from '@celo-tools/celo-ethers-wrapper';
import { initializeApp } from 'firebase/app';
import { collection, deleteDoc, doc, getDocs, query, setDoc, where, writeBatch } from 'firebase/firestore/lite';

enum Periods {
  'minute',
  'hour',
  'day',
}

const container = DI.createContainer()
  .register(Registration.instance(IFirebaseApp, initializeApp({ ...firebaseConfig, apiKey: globalThis.process.env.FIREBASE_API_KEY })))
  .register(Registration.instance(IIpfsService, {}))
  .register(ContractService)
  .register(EthereumService)
  .register(SymmetricService)
  .register(Registration.instance(IWalletProvider, {}))
  .register(Registration.instance(IWalletConnector, {}))
  .register(Registration.instance(IBrowserStorageService, { lsGet: () => '', lsSet: () => '' }))
  .register(FirebaseService)
  .register(ContractStore)
  .register(TokenService)
  .register(DataStore)

  .register(
    Registration.instance(
      IReadOnlyProvider,
      new CeloProvider(
        { url: 'https://celo-mainnet.infura.io/v3/724935fba337407c8f49b12c9a240b7a', skipFetchSetup: true },
        {
          name: CHAIN.toLowerCase(),
          chainId: CHAIN_ID,
        },
      ),
    ),
  )
  .register(
    Registration.instance(IConfiguration, {
      chainId: CHAIN_ID,
      ipfsGateway: IPFS_GATEWAY,
      chainUrl: CHAIN_URL,
      chain: CHAIN,
      isDevelopment: process.env.NODE_ENV !== 'production',
      scanLink: SCAN_LINK,
      firebaseCollection: FIREBASE_COLLECTION,
    }),
  )
  .register(CacheService)
  .register(TreasuryStore)
  .register(ReserveStore)

  .register(
    Registration.instance(ITokenData, {
      tokens: tokenData,
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
      error: () => {
        // blah
      },
    }),
  );

export const seed = async () => {
  let dataCaptured = false;
  const minuteInterval = 5;
  const hourInterval = 1;
  const dayInterval = 1;
  const kttValue = '';
  // const numberService: INumberService = container.get(INumberService);
  const reserveStore: IReserveStore = container.get(IReserveStore);
  let reserveValue = '';
  let currentLeverageRatio = 0;
  let maxLeverageRatio = 0;
  let kCurPrice = 0;
  let kCurPriceCeiling = 0;
  let kCurPriceFloor = 0;
  let kCurReserveDistribution = 0;
  let kCurMentoDistribution = 0;
  let kCurPrimaryPoolDistribution = 0;
  let kCurCirculatingDistribution = 0;
  let kGuilderValueRatio = 0;
  let captureDataPromise: Promise<void> | undefined = undefined;
  let minCollateralValue = 0;
  let marketCap = 0;
  let lowRisk = 0;
  let moderateRisk = 0;
  let highRisk = 0;

  const service = container.get(IFirebaseService);
  const database = await service.connect();

  const periods = Object.values(Periods)
    .filter((y) => typeof y === 'number')
    .map((y) => y as Periods);

  const getLastSyncTime = async (interval: string): Promise<string> => {
    const lastSync = collection(database, `${FIREBASE_COLLECTION}/lastSync/${interval}`);
    const lastSyncDocs = await getDocs(lastSync);
    return lastSyncDocs.docs[0]?.id;
  };
  const setLastSyncTime = async (period: string, time: number, prevDocName?: string): Promise<void> => {
    if (prevDocName) {
      //if a doc exists for last sync time for this interval then delete it
      await deleteDoc(doc(database, `${FIREBASE_COLLECTION}/lastSync/${period}/${prevDocName}`));
    }
    //add a doc for the last sync time for the given interval
    await setDoc(doc(database, `${FIREBASE_COLLECTION}/lastSync/${period}`, time.toString()), {});
  };
  const addData = async (document: string, period: string, time: number, value: string | number | object): Promise<void> => {
    let objectToSave = value;
    if (typeof objectToSave !== 'object') {
      objectToSave = { value: value };
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    (objectToSave as any).createdAt = time;
    await setDoc(doc(database, `${FIREBASE_COLLECTION}/${document}/${period}`, time.toString()), objectToSave);
  };
  const deleteData = async (document: string, period: string, date: number) => {
    const batch = writeBatch(database);
    const docsToDelete = await getDocs(query(collection(database, `${FIREBASE_COLLECTION}/${document}/${period}`), where('createdAt', '<', date)));
    docsToDelete.forEach((x) => batch.delete(x.ref));
    await batch.commit();
  };
  const getTreasuryValue = async (): Promise<string> => {
    const treasuryStore = container.get(ITreasuryStore);
    const treasuryContract = await treasuryStore.getTreasuryContract();
    return (await treasuryContract.totalValuation()).toHexString();
  };
  const loadReserveData = async (): Promise<void> => {
    await reserveStore.loadAssets(); //loads reserve value and assets
    await reserveStore.loadkCur(); //loads kCur and the supply distributions
    await reserveStore.loadkGuilder(); //loads kG data
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
    // kttValue = await getTreasuryValue();

    //Get current Reserve value
    await loadReserveData();
    reserveValue = reserveStore.reserveValue?.toHexString() ?? '';

    //Get current kCur leverage ratio
    currentLeverageRatio = reserveStore.currentLeverageRatio;
    maxLeverageRatio = reserveStore.maxLeverageRatio;

    //Get current kCur Price
    kCurPrice = reserveStore.kCurPrice ?? 0;
    kCurPriceFloor = reserveStore.kCurPriceFloor ?? 0;
    kCurPriceCeiling = reserveStore.kCurPriceCeiling ?? 0;

    //Get current kCur Supply Distribution
    kCurReserveDistribution = reserveStore.kCurReserveDistribution ?? 0;
    kCurMentoDistribution = reserveStore.kCurMentoDistribution ?? 0;
    kCurPrimaryPoolDistribution = reserveStore.kCurPrimaryPoolDistribution ?? 0;
    kCurCirculatingDistribution = reserveStore.kCurCirculatingDistribution;

    //Get and store current Risk Value
    minCollateralValue = reserveStore.minCollateralizationValue;
    marketCap = reserveStore.kCurTotalValue;
    lowRisk = reserveStore.lowRiskAssets.map((x) => x.total).sum();
    moderateRisk = reserveStore.moderateRiskAssets.map((x) => x.total).sum();
    highRisk = reserveStore.highRiskAssets.map((x) => x.total).sum();

    //Get and store current kGuilder-kCur Value Ratio
    kGuilderValueRatio = reserveStore.kGuilderValueRatio ?? 0;
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
          await addData('kCurPrice', Periods[period], newSyncTime.getTime(), { kCurPrice, kCurPriceCeiling, kCurPriceFloor });
          await addData('kCurRatio', Periods[period], newSyncTime.getTime(), { currentLeverageRatio, maxLeverageRatio });
          await addData('kCurSupply', Periods[period], newSyncTime.getTime(), {
            kCurReserveDistribution,
            kCurMentoDistribution,
            kCurPrimaryPoolDistribution,
            kCurCirculatingDistribution,
          });

          // await addData('ktt', Periods[period], newSyncTime.getTime(), kttValue);
          await addData('reserve', Periods[period], newSyncTime.getTime(), reserveValue);
          await addData('risk', Periods[period], newSyncTime.getTime(), {
            minCollateralValue,
            marketCap,
            lowRisk,
            moderateRisk,
            highRisk,
          });
          await addData('kGuilder', Periods[period], newSyncTime.getTime(), kGuilderValueRatio);
          await setLastSyncTime(Periods[period], newSyncTime.getTime(), lastSync); //set latest sync time

          //delete unneeded records for this interval
          const earliestTime = getTimeMinusInterval(period);
          await deleteData('kCurPrice', Periods[period], earliestTime);
          await deleteData('kCurRatio', Periods[period], earliestTime);
          await deleteData('kCurSupply', Periods[period], earliestTime);
          await deleteData('ktt', Periods[period], earliestTime);
          await deleteData('reserve', Periods[period], earliestTime);
          await deleteData('risk', Periods[period], earliestTime);
          await deleteData('kGuilder', Periods[period], earliestTime);
        });
      }
      return;
    }),
  );
};

await seed();
