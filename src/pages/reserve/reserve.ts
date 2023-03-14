import { customElement, ICustomElementViewModel } from 'aurelia';
import { I18N } from '@aurelia/i18n';

import * as pages from './pages';
import template from './reserve.html';

import './reserve.scss';

import { IStore } from 'stores';

@customElement({ name: 'reserve', template, dependencies: [pages] })
export class Reserve implements ICustomElementViewModel {
  constructor(@I18N private readonly i18n: I18N, @IStore private readonly store: IStore) {
    this.store.pageTitle = this.i18n.tr('navigation.reserve.overview.title');
    this.store.routes = [
      { name: this.i18n.tr('navigation.reserve.overview.menu'), path: 'reserve/overview' },
      { name: this.i18n.tr('navigation.reserve.k-cur.menu'), path: 'reserve/k-cur' },
      // { name: this.i18n.tr('navigation.reserve.bond-admin.menu'), path: 'bond-admin' },
      { name: this.i18n.tr('navigation.reserve.risk.menu'), path: 'reserve/risk' },
      { name: this.i18n.tr('navigation.reserve.k-guilder.menu'), path: 'reserve/k-guilder' },
      //{ name: this.i18n.tr('navigation.reserve.governance.menu'), path: 'governance' },
    ];
  }
}
