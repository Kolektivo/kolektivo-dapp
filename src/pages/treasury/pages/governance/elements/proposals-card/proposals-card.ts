import './proposals-card.scss';
import * as tabs from './tabs';
import { I18N } from '@aurelia/i18n';
import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import template from './proposals-card.html';

@customElement({ name: 'proposals-card', template, dependencies: [tabs] })
export class ProposalsCard implements ICustomElementViewModel {
  routes: RouteLink[] = [];
  constructor(@I18N private readonly i18n: I18N) {
    this.routes = [
      { name: this.i18n.tr('navigation.treasury.governance.proposals-card.ready-to-execute-tab.title'), path: 'ready-to-execute', isActive: true },
      { name: this.i18n.tr('navigation.treasury.governance.proposals-card.pending-veto-tab.title'), path: 'pending-veto', isActive: false },
      { name: this.i18n.tr('navigation.treasury.governance.proposals-card.history-tab.title'), path: 'history', isActive: false },
    ];
  }
}
