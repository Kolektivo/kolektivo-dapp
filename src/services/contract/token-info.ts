import { DI } from 'aurelia';

import type TokenListType from '../../tokenlist.json';

export type ITokenInfo = typeof TokenListType['tokens'][0] & { price?: number };

export type ITokenData = {
  tokens: Promise<ITokenInfo[]>;
};
export const ITokenData = DI.createInterface<ITokenData>();
export { TokenListType };
