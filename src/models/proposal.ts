import { BigNumber, Transaction } from 'ethers';
import type { ITokenInfo } from 'services/contract/token-info';

/* eslint-disable @typescript-eslint/naming-convention */
export interface Proposal {
  title: string;
  token: ITokenInfo;
  quantity: BigNumber;
  status: ProposalStatus;
  verified: boolean;
  destinationAddress: string;
  transaction?: Transaction;
}

export enum ProposalStatus {
  'Pending' = 'Pending',
  'Approved' = 'Approved',
  'Vetoed' = 'Vetoed',
  'Ready' = 'Ready',
  'Executed' = 'Executed',
}
