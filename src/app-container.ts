import { ConsoleSink, DI, IContainer, IPlatform, LoggerConfiguration, LogLevel, PLATFORM, Registration, StyleConfiguration } from 'aurelia';
import { I18nConfiguration } from '@aurelia/i18n';
import { RouterConfiguration } from '@aurelia/router-lite';
import { StandardConfiguration } from '@aurelia/runtime-html';

import { IConfiguration } from './configurations/configuration';
import { firebaseConfig } from './configurations/firebase';
import designScss from './design-system/styles/shared.scss?inline';
import { ITokenData, tokenData } from './services/contract/token-info';
import { IFirebaseApp } from './services/firebase-service';
import { IIpfsApi } from './services/ipfs/ipfs-interface';
import { Services } from './services/services';
import { imageMap } from './app-images';
import { DesignSystemPlugin } from './design-system';
import { CHAIN, CHAIN_ID, CHAIN_URL, FIREBASE_API_KEY, FIREBASE_COLLECTION, IPFS_GATEWAY, IS_DEV, KG_CUSD, SCAN_LINK, SHOW_STORYBOOK } from './environment-variables';
import * as hooks from './hooks';
import { CeloProviderFactory, IProviderFactory } from './provider-factory';
import { IReadOnlyProvider } from './read-only-provider';
import * as resources from './resources';
import scss from './shared.scss?inline';
import { Store } from './stores';
import { IWalletConnector } from './wallet-connector';
import { IWalletProvider, WalletProvider } from './wallet-provider';
import { Web3ModalConnect } from './web3modal-details';

import { CeloProvider } from '@celo-tools/celo-ethers-wrapper';
import Backend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import intervalPlural from 'i18next-intervalplural-postprocessor';

// const ipfs = await create({
//   repo: String(Math.random() + Date.now()),
//   init: { algorithm: 'Ed25519' },
// });

// const ipfs = create({
//   headers: { 'x-kol-auth': '1af5b9c6-a8ee-44ef-b211-9d4bf66e1ab8' },
//   port: 5001,
//   url: 'https://ipfs.rpcs.dev:5001',
// });
//await ipfs.id();

const dateFormatters: Record<string, Intl.DateTimeFormat> = {
  minute: new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  }),
  hour: new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: 'numeric',
  }),
  day: new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'short',
    weekday: 'short',
    year: 'numeric',
  }),
  timestamp: new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    month: 'short',
    weekday: 'short',
    year: 'numeric',
  }),
};
export const appContainer: IContainer = DI.createContainer()
  .register(
    Registration.instance(IPlatform, PLATFORM),
    StandardConfiguration.customize((y) => {
      y.coercingOptions = {
        coerceNullish: false,
        enableCoercion: true,
      };
    }),
    // Registration.instance(IReadOnlyProvider, new CeloProvider({ url: CHAIN_URL, skipFetchSetup: true })),
  )
  .register(Registration.singleton(IWalletProvider, WalletProvider))
  .register(Registration.singleton(IWalletConnector, Web3ModalConnect))
  .register(StyleConfiguration.shadowDOM({ sharedStyles: [designScss, scss] }))
  .register(Services)
  .register(Store)
  .register(hooks)
  .register(resources)
  .register(Registration.cachedCallback(IFirebaseApp, () => import('firebase/app').then((x) => x.initializeApp({ ...firebaseConfig, apiKey: FIREBASE_API_KEY }))))
  .register(
    Registration.instance(IConfiguration, {
      chainId: CHAIN_ID,
      ipfsGateway: IPFS_GATEWAY,
      chainUrl: CHAIN_URL,
      chain: CHAIN,
      isDevelopment: IS_DEV,
      showStorybook: SHOW_STORYBOOK,
      scanLink: SCAN_LINK,
      firebaseCollection: FIREBASE_COLLECTION,
      kGcUSD: KG_CUSD,
    }),
  )
  // .register(
  //   Registration.cachedCallback(IEncryptionClient, async () => {
  //     const LitJsSdk = (await import('lit-js-sdk')).default;
  //     const client: Partial<IEncryptionClient> = new LitJsSdk.LitNodeClient();
  //     client.getAuthSig = LitJsSdk.signAndSaveAuthMessage;
  //     client.encryptString = LitJsSdk.encryptString;
  //     client.decryptString = LitJsSdk.decryptString;
  //     client.uint8arrayToString = LitJsSdk.uint8arrayToString;
  //     return client as IEncryptionClient;
  //   }),
  // )
  .register(
    Registration.instance(
      IReadOnlyProvider,
      new CeloProvider(
        { url: CHAIN_URL, skipFetchSetup: true },
        {
          name: CHAIN.toLowerCase(),
          chainId: CHAIN_ID,
        },
      ),
    ),
  )
  .register(Registration.singleton(IProviderFactory, CeloProviderFactory))
  .register(
    Registration.instance(ITokenData, {
      tokens: tokenData,
    }),
  )
  .register(
    LoggerConfiguration.create({
      level: IS_DEV ? LogLevel.debug : LogLevel.warn,
      sinks: [ConsoleSink],
    }),
  )
  .register(
    RouterConfiguration.customize({
      useUrlFragmentHash: false,
      basePath: '/',
      activeClass: 'active',
    }),
  )
  .register(
    I18nConfiguration.customize((options) => {
      options.initOptions = {
        fallbackLng: { default: ['en'] },
        interpolation: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          format: function (value: any, format: any): any {
            if (!format) return value;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            if (value instanceof Date) return dateFormatters[format as string].format(value);
            return value;
          },
        },
        backend: {
          backends: [HttpBackend],
          backendOptions: [
            {
              expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
            },
            {
              loadPath: `/locales/{{lng}}/{{ns}}.json?id=${import.meta.env.KOL_VERCEL_GIT_COMMIT_SHA ?? 1}`,
            },
          ],
        },
        plugins: [Backend, intervalPlural],
      };
    }),
  )
  .register(Registration.instance(IIpfsApi, {}))
  .register(
    DesignSystemPlugin.configure((x) => {
      x.iconMap = imageMap;
      x.defaultToastTimeout = 5000;
    }),
  );

if (import.meta.env.KOL_SHOW_STORYBOOK) {
  appContainer.register(await import('./pages/storybook'));
}
