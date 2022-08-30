import { BigNumber } from '@ethersproject/bignumber';
import { ITokenInfo } from 'services/token-types';
/* eslint-disable @typescript-eslint/naming-convention */
export interface Asset {
  token: ITokenInfo;
  quantity: BigNumber;
  total: number;
}
