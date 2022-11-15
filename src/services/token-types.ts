import { BigNumber } from '@ethersproject/bignumber';
import { TransactionResponse } from '@ethersproject/providers';

export interface IErc20Token {
  allowance(owner: string, spender: string): Promise<BigNumber>;
  approve(spender: string, amount: BigNumber): Promise<TransactionResponse>; // boolean
  balanceOf(account: string): Promise<BigNumber>;
  totalSupply(): Promise<BigNumber>;
  transfer(recipient: string, amount: BigNumber): Promise<TransactionResponse>; // boolean
  transferFrom(sender: string, recipient: string, amount: BigNumber): Promise<TransactionResponse>; // boolean
}

export interface IErc721Token {
  balanceOf(owner: string): Promise<BigNumber>;
  ownerOf(tokenId: number): Promise<string>;
  safeTransferFrom(from: string, to: string, tokenId: number): Promise<TransactionResponse>;
  transferFrom(from: string, to: string, tokenId: number): Promise<TransactionResponse>;
  approve(to: string, tokenId: number): Promise<TransactionResponse>;
  setApprovalForAll(operator: string, approved: boolean): Promise<TransactionResponse>;
  getApproved(tokenId: number): Promise<boolean>;
  isApprovedForAll(owner: string, operator: string): Promise<boolean>;
}

/**
 * string with format "string_id", where "_id_" is optional, only used for NFTs
 */
export type TokenstringId = string;

export interface ITokenHolder {
  /**
   * of: string holder
   */
  string: string;
  /**
   * token balance
   */
  balance: BigNumber;
  /**
   * share of holder in percent
   */
  share: number;
}
