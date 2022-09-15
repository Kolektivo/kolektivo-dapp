import * as elements from './elements';
import { BadgeType } from 'models/badge-type';
import { I18N } from '@aurelia/i18n';
import { IKolektivoStore } from 'stores';
import { customElement, observable } from 'aurelia';
import template from './governance.html';
@customElement({ name: 'governance', template, dependencies: [elements] })
export class Governance {
  @observable selectedBadge?: number;
  constructor(@IKolektivoStore private readonly kolektivoStore: IKolektivoStore, @I18N private readonly i18n: I18N) {}

  get hasSubmitAccess(): boolean {
    return this.kolektivoStore.badges.some((x) => x.type === BadgeType.Treasury_Delegate);
  }

  selectedBadgeChanged(): void {
    switch (this.selectedBadge) {
      case 0:
        this.kolektivoStore.badges = [];
        break;
      case 1:
        this.kolektivoStore.badges = [
          {
            name: 'Local Kolektivo Multi-Sig Member',
            description: 'Local Kolektivo Multi-Sig Member',
            imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
            type: BadgeType.Local_Kolektivo_Multi_Sig_Member,
            verified: false,
          },
        ];
        break;
      case 2:
        this.kolektivoStore.badges = [
          {
            name: 'Reserve Arbitrageur',
            description: 'Reserve Arbitrageur',
            imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
            type: BadgeType.Reserve_Arbitrageur,
            verified: false,
          },
        ];
        break;
      case 3:
        this.kolektivoStore.badges = [
          {
            name: 'Treasury Arbitrageur',
            description: 'Treasury Arbitrageur',
            imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
            type: BadgeType.Treasury_Arbitrageur,
            verified: false,
          },
        ];
        break;
      case 4:
        this.kolektivoStore.badges = [
          {
            name: 'Topology Data Delegate',
            description: 'Topology Data Delegate',
            imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
            type: BadgeType.Topology_Data_Delegate,
            verified: false,
          },
        ];
        break;
      case 5:
        this.kolektivoStore.badges = [
          {
            name: 'Ecology Data Delegate',
            description: 'Ecology Data Delegate',
            imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
            type: BadgeType.Ecology_Data_Delegate,
            verified: false,
          },
        ];
        break;
      case 6:
        this.kolektivoStore.badges = [
          {
            name: 'Treasury Delegate',
            description: 'Treasury Delegate',
            imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
            type: BadgeType.Treasury_Delegate,
            verified: false,
          },
        ];
        break;
      case 7:
        this.kolektivoStore.badges = [
          {
            name: 'Reserve Monetary Delegate',
            description: 'Reserve Monetary Delegate',
            imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
            type: BadgeType.Reserve_Monetary_Delegate,
            verified: false,
          },
        ];
        break;
      case 8:
        this.kolektivoStore.badges = [
          {
            name: 'Kolektivo Network Multi-Sig Member',
            description: 'Kolektivo Network Multi-Sig Member',
            imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
            type: BadgeType.Kolektivo_Network_Multi_Sig_Member,
            verified: false,
          },
        ];
        break;
    }
  }
}
