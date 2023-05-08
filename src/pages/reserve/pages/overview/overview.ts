import { customElement, ICustomElementViewModel } from 'aurelia';
import { I18N } from '@aurelia/i18n';

import { IStore } from '../../../../stores';

import * as elements from './elements';
import template from './overview.html';

import './overview.scss';

@customElement({ name: 'overview', template, dependencies: [elements] })
export class Overview implements ICustomElementViewModel {
  constructor(@I18N private readonly i18n: I18N, @IStore private readonly store: IStore) {
    this.store.pageTitle = this.i18n.tr('navigation.reserve.overview.title');
  }
}
