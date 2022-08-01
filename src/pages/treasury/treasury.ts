import './treasury.scss';
import { I18N } from '@aurelia/i18n';
import { ICustomElementViewModel, customElement } from 'aurelia';
import template from './treasury.html';

@customElement({ name: 'treasury', template })
export class Treasury implements ICustomElementViewModel {
  constructor(@I18N private readonly i18n: I18N) {}

  get routes() {
    return [
      { name: this.i18n.evaluate('treasury.menu.overview'), path: 'overview' },
      { name: this.i18n.evaluate('treasury.menu.governance'), path: 'governance' },
    ];
  }
}
