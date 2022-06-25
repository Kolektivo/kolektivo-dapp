import { css } from '@microsoft/fast-element';
import { fastAvatar, fastOption, provideFASTDesignSystem, selectStyles } from '@microsoft/fast-components';

import { AppTask, IAttrMapper, IContainer, NodeObserverLocator } from 'aurelia';
import { Select, selectTemplate as template } from '@microsoft/fast-foundation';

export const customSelect = Select.compose({
  baseName: 'select',
  template,
  styles: (context, definition) => css`
    ${selectStyles(context, definition)}
    .listbox::-webkit-scrollbar-thumb {
      background-color: var(--ocean-blue);
      border-radius: var(--scrollbar-radius);
    }
    .listbox::-webkit-scrollbar {
      width: var(--scrollbar-width);
    }
    .listbox {
      max-height: 200px !important;
    }
  `,
});
provideFASTDesignSystem().register(customSelect(), fastOption(), fastAvatar());

export default AppTask.beforeCreate(IContainer, container => {
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
});
