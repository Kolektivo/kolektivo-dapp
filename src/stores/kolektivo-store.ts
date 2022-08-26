import { DI, IContainer, Registration } from 'aurelia';
export type IKolektivoStore = KolektivoStore;
export const IKolektivoStore = DI.createInterface<IKolektivoStore>('KolektivoStore');

type TransactionStatus = 'success' | 'failed' | 'pending';

type Transaction = {
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

type Badge = {
  name: string;
  description?: string;
  imageUrl?: string;
};

type SupplyDistribution = {
  treasury: number;
  reserves: number;
  circulating: number;
  circulatingExternal?: number;
};

type TokenInfo = {
  marketCap: number;
  currentPrice: number;
  totalSupply: number;
  supplyDistribution?: SupplyDistribution;
};

export class KolektivoStore {
  public static register(container: IContainer): void {
    container.register(Registration.singleton(IKolektivoStore, KolektivoStore));
  }

  public badges: Badge[] = [
    {
      name: 'Badge Name 1',
      description: 'This is a badge description for what the user can do',
      imageUrl: 'https://pickaface.net/gallery/avatar/unr_randomavatar_170412_0236_9n4c2i.png',
    },
    {
      name: 'Badge Name 2',
      description: '222 This is a badge description for what the user can do',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBQ7wJMICTg6bIjVa2_VDmVEVNKWxr4th2H4WvODmwhMp1ciux4UgbPiKYHhhyTsUHHl4&usqp=CAU',
    },
  ];

  public transactions: Transaction[] = [
    {
      id: '0x69a5da6c2ed9304093b0eb5efc905bda6a9418e67a11164eae41455acb99739e',
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
      id: '0x69a5da6c2ed9304093b0eb5efc905bda6a9418e67a11164eae41455acb99739e',
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
      id: '0x69a5da6c2ed9304093b0eb5efc905bda6a9418e67a11164eae41455acb99739e',
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
