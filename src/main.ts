import { App } from './app';
import { DesignSystemPlugin } from '../design-system';
import { RouterConfiguration } from '@aurelia/router';
import { StyleConfiguration } from 'aurelia';
import Aurelia /*, { StyleConfiguration }*/ from 'aurelia';
// Css files imported in this main file are NOT processed by style-loader
// They are for sharedStyles in shadowDOM.
// However, css files imported in other js/ts files are processed by style-loader.
import * as pages from './pages';
import * as resources from './resources';
import calendar_today from '@material-design-icons/svg/outlined/calendar_today.svg';
import designScss from '../design-system/styles/shared.scss';
import scss from './shared.scss';

Aurelia.register(
  DesignSystemPlugin.configure(x => {
    DesignSystemPlugin.iconMap.set('calendar_today', calendar_today);
  }),
)
  .register(StyleConfiguration.shadowDOM({ sharedStyles: [scss, designScss] }))
  .register(pages)
  .register(resources)
  .register(RouterConfiguration.customize({ useUrlFragmentHash: false }))

  .app(App)
  .start();
