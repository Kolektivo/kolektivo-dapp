import { Address } from './EthereumService';
import { BigNumber } from 'ethers/lib/ethers';
import { TransactionResponse } from './TransactionsService';

export interface IErc20Token {
  allowance(owner: Address, spender: Address): Promise<BigNumber>;
  approve(spender: Address, amount: BigNumber): Promise<TransactionResponse>; // boolean
  balanceOf(account: Address): Promise<BigNumber>;
  totalSupply(): Promise<BigNumber>;
  transfer(recipient: Address, amount: BigNumber): Promise<TransactionResponse>; // boolean
  transferFrom(sender: Address, recipient: Address, amount: BigNumber): Promise<TransactionResponse>; // boolean
}

export type ITokenPrices = Record<string, number>;

export interface ITokenInfoUniswap {
  readonly chainId: number;
  readonly address: Address;
  decimals: number;
  logoURI?: string;
  name: string;
  symbol: string;
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
   * address of holder
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
