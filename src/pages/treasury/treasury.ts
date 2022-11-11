import { customElement, ICustomElementViewModel } from 'aurelia';
import { I18N } from '@aurelia/i18n';

import * as pages from './pages';
import template from './treasury.html';

import './treasury.scss';
@customElement({ name: 'treasury', template, dependencies: [pages] })
export class Treasury implements ICustomElementViewModel {
  constructor(@I18N private readonly i18n: I18N) {}

  routes() {
    return [
      { name: this.i18n.tr('navigation.treasury.menu.overview', { defaultValue: 'Overview' }), path: 'overview' },
      { name: this.i18n.tr('navigation.treasury.menu.governance', { defaultValue: 'Governance' }), path: 'governance' },
    ];
  }
}
