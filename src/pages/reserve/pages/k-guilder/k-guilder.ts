import { customElement, ICustomElementViewModel } from 'aurelia';
import { I18N } from '@aurelia/i18n';

import { IStore } from '../../../../stores';
import { IReserveStore } from '../../../../stores/reserve-store';

import * as elements from './elements';
import template from './k-guilder.html';

import './k-guilder.scss';

@customElement({ name: 'k-guilder', template, dependencies: [elements] })
export class KGuilder implements ICustomElementViewModel {
  constructor(@IReserveStore private readonly reserveStore: IReserveStore, @I18N private readonly i18n: I18N, @IStore private readonly store: IStore) {
    this.store.pageTitle = this.i18n.tr('navigation.reserve.overview.title');
  }
}
