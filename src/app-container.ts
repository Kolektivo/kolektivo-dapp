import * as hooks from './hooks';
import * as pages from './pages';
import * as resources from './resources';
import { CHAIN, CHAIN_ID, CHAIN_URL, IPFS_GATEWAY, IS_DEV, SCAN_LINK } from './environment-variables';
import { CeloProvider } from '@celo-tools/celo-ethers-wrapper';
import { CeloProviderFactory, IProviderFactory } from './provider-factory';
import { ConsoleSink, DI, IContainer, IPlatform, LogLevel, LoggerConfiguration, PLATFORM, Registration, StyleConfiguration } from 'aurelia';
import { DesignSystemPlugin } from './design-system';
import { I18nConfiguration } from '@aurelia/i18n';
import { IConfiguration } from 'configurations/configuration';
import { IIpfsApi } from './services/ipfs/ipfs-interface';
import { IReadOnlyProvider } from 'read-only-provider';
import { ITokenData, getTokenInfos } from './services/contract/token-info';
import { RouterConfiguration } from '@aurelia/router';
import { Services } from './services/services';
import { StandardConfiguration } from '@aurelia/runtime-html';
import { Store } from './stores';
import { imageMap } from './app-images';
import designScss from './design-system/styles/shared.scss';
import en from './locales/en/translation.json';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import scss from './shared.scss';

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

export const appContainer: IContainer = DI.createContainer()
  .register(
    Registration.instance(IPlatform, PLATFORM),
    StandardConfiguration.customize((y) => {
      y.coercingOptions = {
        coerceNullish: false,
        enableCoercion: true,
      };
    }),
    Registration.instance(IReadOnlyProvider, new CeloProvider({ url: CHAIN_URL, skipFetchSetup: true })),
  )
  .register(StyleConfiguration.shadowDOM({ sharedStyles: [designScss, scss] }))
  .register(Services)
  .register(Store)
  .register(hooks)
  .register(resources)
  .register(pages)
  .register(
    Registration.instance(ITokenData, {
      tokens: getTokenInfos(),
    }),
  )
  .register(
    Registration.instance(IConfiguration, {
      chainId: CHAIN_ID,
      ipfsGateway: IPFS_GATEWAY,
      chainUrl: CHAIN_URL,
      chain: CHAIN,
      isDevelopment: IS_DEV,
      scanLink: SCAN_LINK,
    }),
  )
  .register(Registration.singleton(IProviderFactory, CeloProviderFactory))
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
        resources: {
          en: { translation: en },
        },
        plugins: [intervalPlural],
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
