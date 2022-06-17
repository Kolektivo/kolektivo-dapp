import Aurelia/*, { StyleConfiguration }*/ from 'aurelia';
import { RouterConfiguration } from '@aurelia/router';
import { App } from './app';
import { DesignSystemPlugin } from './design-system';
import { StyleConfiguration } from 'aurelia';
// Css files imported in this main file are NOT processed by style-loader
// They are for sharedStyles in shadowDOM.
// However, css files imported in other js/ts files are processed by style-loader.
import scss from './shared.scss';

Aurelia
  .register(StyleConfiguration.shadowDOM(
    { sharedStyles: [scss] }
  ))
  .register(RouterConfiguration.customize({ useUrlFragmentHash: false }))
  .register(DesignSystemPlugin({}))
  .app(App)
  .start();
