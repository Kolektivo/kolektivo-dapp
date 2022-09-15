import { BigNumber, Transaction } from 'ethers';
import { ITokenInfo } from 'services/token-types';

/* eslint-disable @typescript-eslint/naming-convention */
export interface Proposal {
  title: string;
  token: ITokenInfo;
  quantity: BigNumber;
  status: string;
  verified: boolean;
  destinationAddress: string;
  transaction?: Transaction;
}
