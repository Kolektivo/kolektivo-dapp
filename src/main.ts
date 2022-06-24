import { App } from './app';
import { AppTask, IAttrMapper, IContainer, NodeObserverLocator, StyleConfiguration } from 'aurelia';
import { DesignSystemPlugin } from './design-system';
import { RouterConfiguration } from '@aurelia/router';
import Aurelia /*, { StyleConfiguration }*/ from 'aurelia';
// Css files imported in this main file are NOT processed by style-loader
// They are for sharedStyles in shadowDOM.
// However, css files imported in other js/ts files are processed by style-loader.
import './fast';
import designScss from './design-system/styles/shared.scss';
import scss from './shared.scss';

Aurelia.register(StyleConfiguration.shadowDOM({ sharedStyles: [scss, designScss] }))
  .register(RouterConfiguration.customize({ useUrlFragmentHash: false }))
  .register(DesignSystemPlugin({}))
  .register(
    AppTask.beforeCreate(IContainer, container => {
      const attrMapper = container.get(IAttrMapper);
      const nodeObserverLocator = container.get(NodeObserverLocator);
      attrMapper.useTwoWay((el, property) => {
        switch (el.tagName) {
          case 'FAST-SLIDER':
          case 'FAST-TEXT-FIELD':
          case 'FAST-TEXT-AREA':
            return property === 'value';
          case 'FAST-CHECKBOX':
          case 'FAST-RADIO':
          case 'FAST-RADIO-GROUP':
          case 'FAST-SWITCH':
            return property === 'checked';
          case 'FAST-TABS':
            return property === 'activeid';
          case 'FAST-SELECT':
            return property === 'open';
          default:
            return false;
        }
      });
      const valuePropertyConfig = { events: ['input', 'change', 'open'] };
      nodeObserverLocator.useConfig({
        'FAST-SELECT': {
          open: valuePropertyConfig,
        },
        'FAST-CHECKBOX': {
          checked: valuePropertyConfig,
        },
        'FAST-RADIO': {
          checked: valuePropertyConfig,
        },
        'FAST-RADIO-GROUP': {
          value: valuePropertyConfig,
        },
        'FAST-SLIDER': {
          value: valuePropertyConfig,
        },
        'FAST-SWITCH': {
          checked: valuePropertyConfig,
        },
        'FAST-TABS': {
          activeid: valuePropertyConfig,
        },
        'FAST-TEXT-FIELD': {
          value: valuePropertyConfig,
        },
        'FAST-TEXT-AREA': {
          value: valuePropertyConfig,
        },
      });
    }),
  )
  .app(App)
  .start();
