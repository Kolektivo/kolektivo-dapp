import { DI, IContainer, Registration } from 'aurelia';

export type IState = State;
export const IState = DI.createInterface<IState>('State');

export type BlockChainState = {
  walletConnected: boolean;
  connectedWalletAddress: string;
  badges: Badge[];
};
export type Badge = {
  name: string;
  description?: string;
  imageUrl?: string;
};

export class State {
  public static register(container: IContainer): void {
    container.register(Registration.singleton(IState, State));
  }
  sideBarOpen = false;
  treasuryState = {};
  blockChainState: BlockChainState = {
    walletConnected: true,
    connectedWalletAddress: '0xBf3a5599f2f6CE89862d640a248e31F30B7ddF29',
    badges: [
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
    ],
  };
}
