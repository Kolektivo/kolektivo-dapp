import { App } from './app';
import { DI, IPlatform, PLATFORM, Registration, StyleConfiguration } from 'aurelia';
import { DesignSystemPlugin } from '../design-system';
import { I18nConfiguration } from '@aurelia/i18n';
import { RouterConfiguration } from '@aurelia/router';
import Aurelia /*, { StyleConfiguration }*/ from 'aurelia';
import en from '/locales/en/translation.json';
import intervalPlural from 'i18next-intervalplural-postprocessor';
// Css files imported in this main file are NOT processed by style-loader
// They are for sharedStyles in shadowDOM.
// However, css files imported in other js/ts files are processed by style-loader.
import * as pages from './pages';
import * as resources from './resources';
import { StandardConfiguration } from '@aurelia/runtime-html';
import alternate_email from '@material-design-icons/svg/outlined/alternate_email.svg';
import calendar_today from '@material-design-icons/svg/outlined/calendar_today.svg';
import check from '@material-design-icons/svg/filled/check.svg';
import check_circle_filled from '@material-design-icons/svg/filled/check_circle.svg';
import close from '@material-design-icons/svg/outlined/close.svg';
import content_copy from '@material-design-icons/svg/outlined/content_copy.svg';
import error_filled from '@material-design-icons/svg/filled/error.svg';
import info_filled from '@material-design-icons/svg/filled/info.svg';
import link from '@material-design-icons/svg/outlined/link.svg';
import warning_filled from '@material-design-icons/svg/filled/warning.svg';

import { NumberService } from './services/NumberService';
import designScss from '../design-system/styles/shared.scss';
import scss from './shared.scss';

const container = DI.createContainer();

container
  .register(Registration.instance(IPlatform, PLATFORM), StandardConfiguration)
  /**
   * This will cause the static function `NumberService.register` to be invoked.
   * We should use this pattern for all services but move them into an index.ts
   * in the "services" folder and then do `register(services)` here.
   */
  .register(NumberService)
  .register(StyleConfiguration.shadowDOM({ sharedStyles: [designScss as string, scss as string] }))
  .register(pages)
  .register(resources)
  .register(RouterConfiguration.customize({ useUrlFragmentHash: false }))
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
      x.iconMap ??= new Map<string, string>();
      x.iconMap.set('alternate_email', alternate_email);
      x.iconMap.set('alternate_email', alternate_email);
      x.iconMap.set('calendar_today', calendar_today);
      x.iconMap.set('check_circle_filled', check_circle_filled);
      x.iconMap.set('check', check);
      x.iconMap.set('close', close);
      x.iconMap.set('content_copy', content_copy);
      x.iconMap.set('error_filled', error_filled);
      x.iconMap.set('info_filled', info_filled);
      x.iconMap.set('link', link);
      x.iconMap.set('warning_filled', warning_filled);
      x.defaultToastTimeout = 5000;
    }),
  );

void new Aurelia(container).app(App).start();
