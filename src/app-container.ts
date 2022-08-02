import { ConsoleSink, DI, IContainer, IPlatform, LogLevel, LoggerConfiguration, PLATFORM, Registration, StyleConfiguration } from 'aurelia';
import { DesignSystemPlugin } from '../design-system';
import { I18nConfiguration } from '@aurelia/i18n';
import { RouterConfiguration } from '@aurelia/router';
import { isDev } from './environment-variables';
import en from '../locales/en/translation.json';
import intervalPlural from 'i18next-intervalplural-postprocessor';
// Css files imported in this main file are NOT processed by style-loader
// They are for sharedStyles in shadowDOM.
// However, css files imported in other js/ts files are processed by style-loader.
import * as pages from './pages';
import * as resources from './resources';
import * as services from './services';
import { StandardConfiguration } from '@aurelia/runtime-html';
import account_balance from '@material-design-icons/svg/outlined/account_balance.svg';
import account_balance_wallet from '@material-design-icons/svg/outlined/account_balance_wallet.svg';
import add_circle from '@material-design-icons/svg/filled/add_circle_outline.svg';
import alternate_email from '@material-design-icons/svg/outlined/alternate_email.svg';
import calendar_today from '@material-design-icons/svg/outlined/calendar_today.svg';
import check from '@material-design-icons/svg/filled/check.svg';
import check_circle_filled from '@material-design-icons/svg/filled/check_circle.svg';
import close from '@material-design-icons/svg/outlined/close.svg';
import content_copy from '@material-design-icons/svg/outlined/content_copy.svg';
import description from '@material-design-icons/svg/outlined/description.svg';
import error_filled from '@material-design-icons/svg/filled/error.svg';
import headset_mic from '@material-design-icons/svg/outlined/headset_mic.svg';
import info_filled from '@material-design-icons/svg/filled/info.svg';
import language from '@material-design-icons/svg/outlined/language.svg';
import link from '@material-design-icons/svg/outlined/link.svg';
import map from '@material-design-icons/svg/outlined/map.svg';
import menu from '@material-design-icons/svg/outlined/menu.svg';
import menu_book from '@material-design-icons/svg/outlined/menu_book.svg';
import savings from '@material-design-icons/svg/outlined/savings.svg';
import swap_horiz from '@material-design-icons/svg/outlined/swap_horiz.svg';
import warning_filled from '@material-design-icons/svg/filled/warning.svg';

import { State } from './state';
import designScss from 'style-loader!../design-system/styles/shared.scss';
import scss from 'style-loader!./shared.scss';
export const appContainer: IContainer = DI.createContainer()
  .register(Registration.instance(IPlatform, PLATFORM), StandardConfiguration)
  .register(StyleConfiguration.shadowDOM({ sharedStyles: [designScss, scss] }))
  .register(services)
  .register(resources)
  .register(pages)
  .register(State)
  .register(
    LoggerConfiguration.create({
      level: isDev ? LogLevel.trace : LogLevel.warn,
      sinks: [ConsoleSink],
    }),
  )
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
      x.iconMap.set('account_balance', account_balance);
      x.iconMap.set('account_balance_wallet', account_balance_wallet);
      x.iconMap.set('add_circle', add_circle);
      x.iconMap.set('alternate_email', alternate_email);
      x.iconMap.set('alternate_email', alternate_email);
      x.iconMap.set('calendar_today', calendar_today);
      x.iconMap.set('check_circle_filled', check_circle_filled);
      x.iconMap.set('check', check);
      x.iconMap.set('close', close);
      x.iconMap.set('content_copy', content_copy);
      x.iconMap.set('description', description);
      x.iconMap.set('error_filled', error_filled);
      x.iconMap.set('headset_mic', headset_mic);
      x.iconMap.set('info_filled', info_filled);
      x.iconMap.set('language', language);
      x.iconMap.set('link', link);
      x.iconMap.set('map', map);
      x.iconMap.set('menu', menu);
      x.iconMap.set('menu_book', menu_book);
      x.iconMap.set('savings', savings);
      x.iconMap.set('swap_horiz', swap_horiz);
      x.iconMap.set('warning_filled', warning_filled);
      x.defaultToastTimeout = 5000;
    }),
  );