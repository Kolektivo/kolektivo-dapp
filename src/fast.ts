import { css } from '@microsoft/fast-element';
import { fastOption, provideFASTDesignSystem, selectStyles } from '@microsoft/fast-components';

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
provideFASTDesignSystem().register(customSelect(), fastOption());
