import './treasury.scss';
import * as pages from './pages';
import { I18N } from '@aurelia/i18n';
import { ICustomElementViewModel, customElement } from 'aurelia';
import template from './treasury.html';
@customElement({ name: 'treasury', template, dependencies: [pages] })
export class Treasury implements ICustomElementViewModel {
  constructor(@I18N private readonly i18n: I18N) {}

  routes() {
    return [
      { name: this.i18n.tr('treasury.menu.overview'), path: 'overview' },
      { name: this.i18n.tr('treasury.menu.governance'), path: 'governance' },
    ];
  }
}
