import * as hooks from './hooks';
import * as pages from './pages';
import * as resources from './resources';
import { ConsoleSink, DI, IContainer, IPlatform, LogLevel, LoggerConfiguration, PLATFORM, Registration, StyleConfiguration } from 'aurelia';
import { DesignSystemPlugin } from './design-system';
import { I18nConfiguration } from '@aurelia/i18n';
import { RouterConfiguration } from '@aurelia/router';
import { Services } from './services/services';
import { StandardConfiguration } from '@aurelia/runtime-html';
import { Store } from './stores';
import { imageMap } from './app-images';
import { isDev } from './environment-variables';
import designScss from './design-system/styles/shared.scss';
import en from './locales/en/translation.json';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import scss from './shared.scss';

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
  .register(
    DesignSystemPlugin.configure((x) => {
      x.iconMap ??= imageMap;
      x.defaultToastTimeout = 5000;
    }),
  );
