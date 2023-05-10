import { customElement, ICustomElementViewModel } from 'aurelia';
import { I18N } from '@aurelia/i18n';

import { IStore } from '../../../../stores';

import * as elements from './elements';
import template from './k-cur.html';

import './k-cur.scss';

@customElement({ name: 'k-cur', template, dependencies: [elements] })
export class KCur implements ICustomElementViewModel {
  constructor(@I18N private readonly i18n: I18N, @IStore private readonly store: IStore) {
    this.store.pageTitle = this.i18n.tr('navigation.reserve.overview.title');
  }
}
