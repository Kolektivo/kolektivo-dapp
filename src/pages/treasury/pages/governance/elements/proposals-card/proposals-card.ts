import './proposals-card.scss';
import * as tabs from './tabs';
import { BadgeType } from 'models/badge-type';
import { I18N } from '@aurelia/i18n';
import { ICustomElementViewModel, customElement, watch } from '@aurelia/runtime-html';
import { IKolektivoStore } from 'stores';
import template from './proposals-card.html';

@customElement({ name: 'proposals-card', template, dependencies: [tabs] })
export class ProposalsCard implements ICustomElementViewModel {
  routes: RouteLink[] = [];
  active?: string;
  constructor(@IKolektivoStore private readonly kolektivoStore: IKolektivoStore, @I18N private readonly i18n: I18N) {}

  attached(): void | Promise<void> {
    this.getRoutes();
  }

  @watch<ProposalsCard>((x) => x.kolektivoStore.badges.map((x) => x.type))
  private getRoutes(): void {
    const routes = [{ name: this.i18n.tr('navigation.treasury.governance.proposals-card.history-tab.title'), path: 'history', isActive: false }];
    if (this.kolektivoStore.badges.some((x) => x.type === BadgeType.Treasury_Delegate)) {
      this.active = 'ready-to-execute';
      routes.unshift({
        name: this.i18n.tr('navigation.treasury.governance.proposals-card.pending-veto-tab.title'),
        path: 'pending-veto',
        isActive: false,
      });
      routes.unshift({
        name: this.i18n.tr('navigation.treasury.governance.proposals-card.ready-to-execute-tab.title'),
        path: 'ready-to-execute',
        isActive: true,
      });
    } else {
      this.active = 'history';
    }
    this.routes = routes;
  }
}
