import './assets-card.scss';
import * as tabs from './tabs';
import { I18N } from '@aurelia/i18n';

import { ICustomElementViewModel, customElement } from 'aurelia';
import template from './assets-card.html';

@customElement({ name: 'assets-card', template, dependencies: [tabs] })
export class AssetsCard implements ICustomElementViewModel {
  constructor(@I18N private readonly i18n: I18N) {}

  routes() {
    return [
      { name: this.i18n.tr('navigation.treasury.overview.assets.assets-tab.title'), path: 'assets' },
      { name: this.i18n.tr('navigation.treasury.overview.assets.transaction-history.title'), path: 'transaction-history' },
    ];
  }
}