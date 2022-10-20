import { BadgeType } from '../models/badge-type';
import { DI, IContainer, Registration } from 'aurelia';
export type IKolektivoStore = KolektivoStore;
export const IKolektivoStore = DI.createInterface<IKolektivoStore>('KolektivoStore');

export type TransactionStatus = 'success' | 'failed' | 'pending';

export type Transaction = {
  id: string;
  status: TransactionStatus;
  fromAmount: number;
  fromToken: string;
  from: string;
  toAmount: number;
  toToken: string;
  to: string;
  date: string;
};

export type SupplyDistribution = {
  treasury: number;
  reserves: number;
  circulating: number;
  circulatingExternal?: number;
};

export type TokenInfo = {
  marketCap: number;
  currentPrice: number;
  totalSupply: number;
  supplyDistribution?: SupplyDistribution;
};

export class KolektivoStore {
  public static register(container: IContainer): void {
    container.register(Registration.singleton(IKolektivoStore, KolektivoStore));
  }

  public transactions: Transaction[] = [
    {
      id: '0xd8d82e1a6e971d1d77615ffaafe40ef37a5791c2a385cf60a19427f9917c0c9c',
      status: 'success',
      fromAmount: 100,
      fromToken: 'ABC',
      from: '0x6088e40ba11a8ef9af341595a611498fbf6a7294',
      toAmount: 100,
      toToken: 'XYZ',
      to: '0xd533ca259b330c7a88f74e000a3faea2d63b7972',
      date: '08/01/2022',
    },
    {
      id: '0x34cf5ac72deb13bd6d186ee9a58661292cfd549ad764a674c652ea8ea3d16a18',
      status: 'failed',
      fromAmount: 432,
      fromToken: 'XYZ',
      from: '0x6088e40ba11a8ef9af341595a611498fbf6a7294',
      toAmount: 524,
      toToken: 'ABC',
      to: '0xd533ca259b330c7a88f74e000a3faea2d63b7972',
      date: '02/01/2022',
    },
    {
      id: '0x7b020394eadf78f545ffb0b80f208f5413ca4f67ff7bb101a50d0ad95c893a09',
      status: 'success',
      fromAmount: 432,
      fromToken: 'XYZ',
      from: '0x6088e40ba11a8ef9af341595a611498fbf6a7294',
      toAmount: 524,
      toToken: 'ABC',
      to: '0xd533ca259b330c7a88f74e000a3faea2d63b7972',
      date: '08/02/2022',
    },
  ];

  public kCur: TokenInfo = {
    marketCap: 4000000,
    currentPrice: 0.98,
    totalSupply: 8000000,
    supplyDistribution: {
      treasury: 40,
      reserves: 40,
      circulating: 10,
      circulatingExternal: 10,
    },
  };

  public kGuilder: TokenInfo = {
    marketCap: 5000000,
    currentPrice: 12.98,
    totalSupply: 8000000,
  };
}

export const allBadges = [
  {
    name: 'Monetary Controller',
    description: 'Monetary Controller',
    imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
    type: BadgeType.MONETARY_CONTROLLER,
    verified: false,
  },
  {
    name: 'Reserve Monetary Delegate',
    description: 'Reserve Monetary Delegate',
    imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
    type: BadgeType.RESERVE_DELEGATE,
    verified: false,
  },
  {
    name: 'Reserve Monetary Veto Delegate',
    description: 'Reserve Monetary Veto Delegate',
    imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
    type: BadgeType.RESERVE_VETO_DELEGATE,
    verified: false,
  },
  {
    name: 'Topology Data Delegate',
    description: 'Topology Data Delegate',
    imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
    type: BadgeType.TOPOLOGY_DELEGATE,
    verified: false,
  },
  {
    name: 'Ecology Data Delegate',
    description: 'Ecology Data Delegate',
    imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
    type: BadgeType.ECOLOGY_DELEGATE,
    verified: false,
  },
  {
    name: 'Ecology Data Delegate Proposer',
    description: 'Ecology Data Delegate Proposer',
    imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
    type: BadgeType.ECOLOGY_DELEGATE_PROPOSER,
    verified: false,
  },
  {
    name: 'Reserve Arbitrageur',
    description: 'Reserve Arbitrageur',
    imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
    type: BadgeType.RESERVE_ARBITRAGEUR,
    verified: false,
  },
  {
    name: 'Local Kolektivo Multi-Sig Member',
    description: 'Local Kolektivo Multi-Sig Member',
    imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
    type: BadgeType.LOCAL_MULTI_SIG_MEMBER,
    verified: false,
  },
  {
    name: 'Treasury Delegate',
    description: 'Treasury Delegate',
    imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
    type: BadgeType.TREASURY_DELEGATE,
    verified: false,
  },
  {
    name: 'Treasury Veto Delegate',
    description: 'Treasury Veto Delegate',
    imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
    type: BadgeType.TREASURY_VETO_DELEGATE,
    verified: false,
  },
  {
    name: 'Treasury Arbitrageur',
    description: 'Treasury Arbitrageur',
    imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
    type: BadgeType.TREASURY_ARBITRAGEUR,
    verified: false,
  },

  {
    name: 'Kolektivo Network Multi-Sig Member',
    description: 'Kolektivo Network Multi-Sig Member',
    imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
    type: BadgeType.KOLEKTIVO_MULTI_SIG_MEMBER,
    verified: false,
  },
];
