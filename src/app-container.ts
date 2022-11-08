import * as hooks from './hooks';
import * as pages from './pages';
import * as resources from './resources';
import { ConsoleSink, DI, IContainer, IPlatform, LogLevel, LoggerConfiguration, PLATFORM, Registration, StyleConfiguration } from 'aurelia';
import { DesignSystemPlugin } from './design-system';
import { I18nConfiguration } from '@aurelia/i18n';
import { IEncryptionClient } from './encryption-client';
import { IFirebaseApp } from './services/firebase-service';
import { IIpfsApi } from './services/ipfs/ipfs-interface';
import { IS_DEV } from './environment-variables';
import { ITokenData } from './services/contract/token-info';
import { IWalletConnector } from './wallet-connector';
import { IWalletProvider } from 'wallet-provider';
import { RouterConfiguration } from '@aurelia/router';
import { Services } from './services/services';
import { StandardConfiguration } from '@aurelia/runtime-html';
import { Store } from './stores';
import { WalletProvider } from './wallet-provider';
import { Web3ModalConnect } from './web3modal-details';
import { configurationFromEnv } from 'configurations/configuration';
import { firebaseConfig } from 'configurations/firebase';
import { imageMap } from './app-images';
import Backend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import designScss from './design-system/styles/shared.scss';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import scss from './shared.scss';
import tokenData from './tokenlist.json';

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
  .register(pages)
  .register(Registration.cachedCallback(IFirebaseApp, () => import('firebase/app').then((x) => x.initializeApp(firebaseConfig))))
  .register(
    Registration.cachedCallback(IEncryptionClient, async () => {
      const LitJsSdk = (await import('lit-js-sdk')).default;
      const client: Partial<IEncryptionClient> = new LitJsSdk.LitNodeClient();
      client.getAuthSig = LitJsSdk.signAndSaveAuthMessage;
      client.encryptString = LitJsSdk.encryptString;
      client.decryptString = LitJsSdk.decryptString;
      client.uint8arrayToString = LitJsSdk.uint8arrayToString;
      return client as IEncryptionClient;
    }),
  )
  .register(configurationFromEnv())
  .register(
    Registration.instance(ITokenData, {
      tokens: tokenData.tokens,
    }),
  )
  .register(
    LoggerConfiguration.create({
      level: IS_DEV ? LogLevel.debug : LogLevel.warn,
      sinks: [ConsoleSink],
    }),
  )
  .register(RouterConfiguration.customize({ useUrlFragmentHash: false, useHref: false, useDirectRouting: true }))
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
          backends: [LocalStorageBackend, HttpBackend],
          backendOptions: [
            {
              expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
            },
            {
              loadPath: '/locales/{{lng}}/{{ns}}.json',
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

if (import.meta.env.DEV) {
  appContainer.register(await import('./pages/storybook'));
}
