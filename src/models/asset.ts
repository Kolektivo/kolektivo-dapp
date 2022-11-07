import { BigNumber } from '@ethersproject/bignumber';
import { ITokenInfo } from 'services/contract';
/* eslint-disable @typescript-eslint/naming-convention */
export interface Asset {
  token: ITokenInfo;
  quantity: BigNumber;
  total: number;
  type?: AssetType;
  totalSupply?: BigNumber;
}
export enum AssetType {
  NonStablecoin = 0,
  Stablecoin = 1,
  Ecological = 2,
}
