import './submit-proposal-card.scss';
import * as tabs from './tabs';
import { I18N } from '@aurelia/i18n';
import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import template from './submit-proposal-card.html';
@customElement({ name: 'submit-proposal-card', template, dependencies: [tabs] })
export class SubmitProposalCard implements ICustomElementViewModel {
  routes: RouteLink[] = [];

  constructor(@I18N private readonly i18n: I18N) {
    this.routes = [
      { name: this.i18n.tr('navigation.treasury.governance.submit-card.bonds-tab.title'), path: 'bonds', isActive: true },
      { name: this.i18n.tr('navigation.treasury.governance.submit-card.bonds-admin-tab.title'), path: 'bond-admin', isActive: false },
      { name: this.i18n.tr('navigation.treasury.governance.submit-card.treasury-tab.title'), path: 'treasury', isActive: false },
      { name: this.i18n.tr('navigation.treasury.governance.submit-card.other-tab.title'), path: 'other', isActive: false },
    ];
  }
}
