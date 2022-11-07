import { Address } from './ethereum-service';
import { BigNumber } from '@ethersproject/bignumber';
import { TransactionResponse } from '@ethersproject/providers';

export interface IErc20Token {
  allowance(owner: Address, spender: Address): Promise<BigNumber>;
  approve(spender: Address, amount: BigNumber): Promise<TransactionResponse>; // boolean
  balanceOf(account: Address): Promise<BigNumber>;
  totalSupply(): Promise<BigNumber>;
  transfer(recipient: Address, amount: BigNumber): Promise<TransactionResponse>; // boolean
  transferFrom(sender: Address, recipient: Address, amount: BigNumber): Promise<TransactionResponse>; // boolean
}

export interface IErc721Token {
  balanceOf(owner: Address): Promise<BigNumber>;
  ownerOf(tokenId: number): Promise<Address>;
  safeTransferFrom(from: Address, to: Address, tokenId: number): Promise<TransactionResponse>;
  transferFrom(from: Address, to: Address, tokenId: number): Promise<TransactionResponse>;
  approve(to: Address, tokenId: number): Promise<TransactionResponse>;
  setApprovalForAll(operator: Address, approved: boolean): Promise<TransactionResponse>;
  getApproved(tokenId: number): Promise<boolean>;
  isApprovedForAll(owner: Address, operator: Address): Promise<boolean>;
}

/**
 * string with format "address_id", where "_id_" is optional, only used for NFTs
 */
export type TokenAddressId = string;

export interface ITokenHolder {
  /**
   * of: Address holder
   */
  address: Address;
  /**
   * token balance
   */
  balance: BigNumber;
  /**
   * share of holder in percent
   */
  share: number;
}
