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
 * string with format "address_id", where "_id_" is optional, only used for NFTs
 */
export type TokenAddressId = string;

export interface ITokenInfoUniswap {
  readonly chainId: number;
  readonly address: string;
  decimals: number;
  logoURI?: string;
  name: string;
  symbol: string;
  /**
   * id does not exist unless the token represents an NFT.  Is technically not part of the
   * Uniswap schema for TokenList.
   */
  id?: number | undefined;
}

/**
 * what we get from TokenLists, per:
 * https://github.com/Uniswap/token-lists
 */
export interface ITokenListUniswap {
  readonly tokens: ITokenInfoUniswap[];
}

export interface ITokenInfo extends ITokenInfoUniswap {
  /**
   * USD price
   */
  price?: number;
}

export interface ITokenHolder {
  /**
   * of: string holder
   */
  address: string;
  /**
   * token balance
   */
  balance: BigNumber;
  /**
   * share of holder in percent
   */
  share: number;
}
