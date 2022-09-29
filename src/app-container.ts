import * as hooks from './hooks';
import * as pages from './pages';
import * as resources from './resources';
import { ConsoleSink, DI, IContainer, IPlatform, LogLevel, LoggerConfiguration, PLATFORM, Registration, StyleConfiguration } from 'aurelia';
import { DesignSystemPlugin } from './design-system';
import { I18nConfiguration } from '@aurelia/i18n';
import { IIpfsApi } from './services/ipfs/ipfs-interface';
import { RouterConfiguration } from '@aurelia/router';
import { Services } from './services/services';
import { StandardConfiguration } from '@aurelia/runtime-html';
import { Store } from './stores';
import { concat } from 'uint8arrays/concat';
import { create } from 'ipfs-core';
import { imageMap } from './app-images';
import { isDev } from './environment-variables';
import { toString } from 'uint8arrays/to-string';
import designScss from './design-system/styles/shared.scss';
import en from './locales/en/translation.json';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import scss from './shared.scss';

const all = async (source: AsyncIterable<Uint8Array>) => {
  const arr = [];

  for await (const entry of source) {
    arr.push(entry);
  }

  return arr;
};

const ipfs = await create({
  repo: String(Math.random() + Date.now()),
  init: { algorithm: 'Ed25519' },
});

console.log(await ipfs.id());
const c = await ipfs.add({ content: '34523543253452432435' });
console.log(toString(concat(await all(ipfs.cat(c.cid)))));

// const ipfs = create({
//   headers: { 'x-kol-auth': '1af5b9c6-a8ee-44ef-b211-9d4bf66e1ab8' },
//   port: 5001,
//   url: 'https://ipfs.rpcs.dev:5001',
// });

export const appContainer: IContainer = DI.createContainer()
  .register(
    Registration.instance(IPlatform, PLATFORM),
    StandardConfiguration.customize((y) => {
      y.coercingOptions = {
        coerceNullish: false,
        enableCoercion: true,
      };
    }),
  )
  .register(StyleConfiguration.shadowDOM({ sharedStyles: [designScss, scss] }))
  .register(Services)
  .register(Store)
  .register(hooks)
  .register(resources)
  .register(pages)
  .register(
    LoggerConfiguration.create({
      level: isDev ? LogLevel.debug : LogLevel.warn,
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
  .register(Registration.instance(IIpfsApi, ipfs))
  .register(
    DesignSystemPlugin.configure((x) => {
      x.iconMap = imageMap;
      x.defaultToastTimeout = 5000;
    }),
  );
