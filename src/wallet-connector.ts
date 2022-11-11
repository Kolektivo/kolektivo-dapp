import { DI } from 'aurelia';

import { type Web3Provider } from '@ethersproject/providers';

export type IWalletConnector = { connect: () => Promise<Web3Provider>; connectTo: (name: string) => Promise<Web3Provider> };
export const IWalletConnector = DI.createInterface<IWalletConnector>();
