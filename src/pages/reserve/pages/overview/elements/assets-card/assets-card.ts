import { customElement, ICustomElementViewModel } from 'aurelia';
import { I18N } from '@aurelia/i18n';

import template from './assets-card.html';
import * as tabs from './tabs';

import './assets-card.scss';

@customElement({ name: 'assets-card', template, dependencies: [tabs] })
export class AssetsCard implements ICustomElementViewModel {
  routes: RouteLink[] = [];
  constructor(@I18N private readonly i18n: I18N) {
    this.routes = [
      { name: this.i18n.tr('general.assets.title'), path: 'assets', isActive: true },
      { name: this.i18n.tr('general.transaction-history.title'), path: 'transaction-history', isActive: false },
    ];
  }

  get activeTab() {
    return this.routes.find((x: RouteLink) => x.isActive)?.path;
  }
}
