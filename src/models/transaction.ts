import type { ITokenInfo } from '../services/contract/token-info';

import { BigNumber } from '@ethersproject/bignumber';
/* eslint-disable @typescript-eslint/naming-convention */
export interface Transaction {
  id: string;
  token: ITokenInfo;
  type: 'deposit' | 'withdrawl';
  amount: BigNumber;
  address: string;
  date: number;
}
