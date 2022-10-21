import * as elements from './elements';
import { BadgeType } from 'models/badge-type';
import { I18N } from '@aurelia/i18n';
import { IAccountStore } from 'stores/account-store';
import { customElement, observable } from 'aurelia';
import template from './governance.html';
@customElement({ name: 'governance', template, dependencies: [elements] })
export class Governance {
  @observable selectedBadge?: number;
  constructor(@IAccountStore private readonly accountStore: IAccountStore, @I18N private readonly i18n: I18N) {}
  get hasSubmitAccess(): boolean {
    return this.accountStore.badges.some((x) => x.type === BadgeType.RESERVE_DELEGATE || x.type === BadgeType.RESERVE_ARBITRAGEUR);
  }
  selectedBadgeChanged(): void {
    switch (this.selectedBadge) {
      case 0:
        this.accountStore.badges = [];
        break;
      case 1:
        this.accountStore.badges = [
          {
            name: 'Local Kolektivo Multi-Sig Member',
            description: 'Local Kolektivo Multi-Sig Member',
            imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
            type: BadgeType.LOCAL_MULTI_SIG_MEMBER,
            verified: false,
          },
        ];
        break;
      case 2:
        this.accountStore.badges = [
          {
            name: 'Reserve Arbitrageur',
            description: 'Reserve Arbitrageur',
            imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
            type: BadgeType.RESERVE_ARBITRAGEUR,
            verified: false,
          },
        ];
        break;
      case 3:
        this.accountStore.badges = [
          {
            name: 'Treasury Arbitrageur',
            description: 'Treasury Arbitrageur',
            imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
            type: BadgeType.TREASURY_ARBITRAGEUR,
            verified: false,
          },
        ];
        break;
      case 4:
        this.accountStore.badges = [
          {
            name: 'Topology Data Delegate',
            description: 'Topology Data Delegate',
            imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
            type: BadgeType.TOPOLOGY_DELEGATE,
            verified: false,
          },
        ];
        break;
      case 5:
        this.accountStore.badges = [
          {
            name: 'Ecology Data Delegate',
            description: 'Ecology Data Delegate',
            imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
            type: BadgeType.ECOLOGY_DELEGATE,
            verified: false,
          },
        ];
        break;
      case 6:
        this.accountStore.badges = [
          {
            name: 'Treasury Delegate',
            description: 'Treasury Delegate',
            imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
            type: BadgeType.TREASURY_DELEGATE,
            verified: false,
          },
        ];
        break;
      case 7:
        this.accountStore.badges = [
          {
            name: 'Reserve Monetary Delegate',
            description: 'Reserve Monetary Delegate',
            imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
            type: BadgeType.RESERVE_DELEGATE,
            verified: false,
          },
        ];
        break;
      case 8:
        this.accountStore.badges = [
          {
            name: 'Kolektivo Network Multi-Sig Member',
            description: 'Kolektivo Network Multi-Sig Member',
            imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
            type: BadgeType.KOLEKTIVO_MULTI_SIG_MEMBER,
            verified: false,
          },
        ];
        break;
    }
  }
}
