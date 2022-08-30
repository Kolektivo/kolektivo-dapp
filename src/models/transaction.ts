import { BigNumber } from '@ethersproject/bignumber';
import { ITokenInfo } from 'services/token-types';
/* eslint-disable @typescript-eslint/naming-convention */
export interface Transaction {
  id: string;
  token: ITokenInfo;
  type: 'deposit' | 'withdrawl';
  amount: BigNumber;
  address: string;
  date: number;
}
