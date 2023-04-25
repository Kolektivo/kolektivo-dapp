import { ITokenInfo } from '../services/contract';

import { BigNumber } from '@ethersproject/bignumber';
/* eslint-disable @typescript-eslint/naming-convention */
export interface Asset {
  token: ITokenInfo;
  quantity: BigNumber;
  total: number;
  type?: AssetType;
  totalSupply?: BigNumber;
}
export enum AssetType {
  Low = 0,
  Medium = 1,
  High = 2,
}
