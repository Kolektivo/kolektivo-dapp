/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { BytesLike as Arrayish, BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type treasuryContractContext = EthersContractContextV5<Treasury, TreasuryMethodNames, TreasuryEventsContext, TreasuryEvents>;

export declare type EventFilter = {
  address?: string;
  topics?: string[];
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
}
export type TreasuryEvents =
  | 'Approval'
  | 'AssetDelistedAsBondable'
  | 'AssetDelistedAsRedeemable'
  | 'AssetDeregistered'
  | 'AssetListedAsBondable'
  | 'AssetListedAsRedeemable'
  | 'AssetOracleUpdated'
  | 'AssetPriceUpdated'
  | 'AssetRegistered'
  | 'AssetsBonded'
  | 'AssetsRedeemed'
  | 'NewOwner'
  | 'NewPendingOwner'
  | 'Rebase'
  | 'Transfer';
export interface TreasuryEventsContext {
  Approval(...parameters: any): EventFilter;
  AssetDelistedAsBondable(...parameters: any): EventFilter;
  AssetDelistedAsRedeemable(...parameters: any): EventFilter;
  AssetDeregistered(...parameters: any): EventFilter;
  AssetListedAsBondable(...parameters: any): EventFilter;
  AssetListedAsRedeemable(...parameters: any): EventFilter;
  AssetOracleUpdated(...parameters: any): EventFilter;
  AssetPriceUpdated(...parameters: any): EventFilter;
  AssetRegistered(...parameters: any): EventFilter;
  AssetsBonded(...parameters: any): EventFilter;
  AssetsRedeemed(...parameters: any): EventFilter;
  NewOwner(...parameters: any): EventFilter;
  NewPendingOwner(...parameters: any): EventFilter;
  Rebase(...parameters: any): EventFilter;
  Transfer(...parameters: any): EventFilter;
}
export type TreasuryMethodNames =
  | 'new'
  | 'DOMAIN_SEPARATOR'
  | 'EIP712_DOMAIN'
  | 'EIP712_REVISION'
  | 'PERMIT_TYPEHASH'
  | 'acceptOwnership'
  | 'allowance'
  | 'approve'
  | 'balanceOf'
  | 'bond'
  | 'decimals'
  | 'decreaseAllowance'
  | 'delistAssetAsBondable'
  | 'delistAssetAsRedeemable'
  | 'deregisterAsset'
  | 'executeTx'
  | 'increaseAllowance'
  | 'isAssetBondable'
  | 'isAssetRedeemable'
  | 'listAssetAsBondable'
  | 'listAssetAsRedeemable'
  | 'name'
  | 'nonces'
  | 'onERC721Received'
  | 'oraclePerAsset'
  | 'owner'
  | 'pendingOwner'
  | 'permit'
  | 'rebase'
  | 'redeem'
  | 'registerAsset'
  | 'registeredAssets'
  | 'scaledBalanceOf'
  | 'scaledTotalSupply'
  | 'setPendingOwner'
  | 'symbol'
  | 'totalSupply'
  | 'totalValuation'
  | 'transfer'
  | 'transferAll'
  | 'transferAllFrom'
  | 'transferFrom'
  | 'updateAssetOracle'
  | 'withdrawAsset';
export interface ApprovalEventEmittedResponse {
  owner: string;
  spender: string;
  value: BigNumberish;
}
export interface AssetDelistedAsBondableEventEmittedResponse {
  asset: string;
}
export interface AssetDelistedAsRedeemableEventEmittedResponse {
  asset: string;
}
export interface AssetDeregisteredEventEmittedResponse {
  asset: string;
}
export interface AssetListedAsBondableEventEmittedResponse {
  asset: string;
}
export interface AssetListedAsRedeemableEventEmittedResponse {
  asset: string;
}
export interface AssetOracleUpdatedEventEmittedResponse {
  asset: string;
  oldOracle: string;
  newOracle: string;
}
export interface AssetPriceUpdatedEventEmittedResponse {
  asset: string;
  oracle: string;
  oldPrice: BigNumberish;
  newPrice: BigNumberish;
}
export interface AssetRegisteredEventEmittedResponse {
  asset: string;
  oracle: string;
}
export interface AssetsBondedEventEmittedResponse {
  who: string;
  asset: string;
  kttsMinted: BigNumberish;
}
export interface AssetsRedeemedEventEmittedResponse {
  who: string;
  asset: string;
  kttsBurned: BigNumberish;
}
export interface NewOwnerEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface NewPendingOwnerEventEmittedResponse {
  previousPendingOwner: string;
  newPendingOwner: string;
}
export interface RebaseEventEmittedResponse {
  epoch: BigNumberish;
  newScalar: BigNumberish;
}
export interface TransferEventEmittedResponse {
  from: string;
  to: string;
  value: BigNumberish;
}
export interface Treasury {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   */
  'new'(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  DOMAIN_SEPARATOR(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  EIP712_DOMAIN(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  EIP712_REVISION(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  PERMIT_TYPEHASH(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  acceptOwnership(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner_ Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   */
  allowance(owner_: string, spender: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param tokens Type: uint256, Indexed: false
   */
  approve(spender: string, tokens: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param who Type: address, Indexed: false
   */
  balanceOf(who: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param asset Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  bond(asset: string, amount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  decimals(overrides?: ContractCallOverrides): Promise<number>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param tokens Type: uint256, Indexed: false
   */
  decreaseAllowance(spender: string, tokens: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param asset Type: address, Indexed: false
   */
  delistAssetAsBondable(asset: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param asset Type: address, Indexed: false
   */
  delistAssetAsRedeemable(asset: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param asset Type: address, Indexed: false
   */
  deregisterAsset(asset: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param target Type: address, Indexed: false
   * @param callData Type: bytes, Indexed: false
   */
  executeTx(target: string, callData: Arrayish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param tokens Type: uint256, Indexed: false
   */
  increaseAllowance(spender: string, tokens: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  isAssetBondable(parameter0: string, overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  isAssetRedeemable(parameter0: string, overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param asset Type: address, Indexed: false
   */
  listAssetAsBondable(asset: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param asset Type: address, Indexed: false
   */
  listAssetAsRedeemable(asset: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  name(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param who Type: address, Indexed: false
   */
  nonces(who: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   * @param parameter2 Type: uint256, Indexed: false
   * @param parameter3 Type: bytes, Indexed: false
   */
  onERC721Received(
    parameter0: string,
    parameter1: string,
    parameter2: BigNumberish,
    parameter3: Arrayish,
    overrides?: ContractCallOverrides,
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  oraclePerAsset(parameter0: string, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  pendingOwner(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param spender Type: address, Indexed: false
   * @param value Type: uint256, Indexed: false
   * @param deadline Type: uint256, Indexed: false
   * @param v Type: uint8, Indexed: false
   * @param r Type: bytes32, Indexed: false
   * @param s Type: bytes32, Indexed: false
   */
  permit(
    owner: string,
    spender: string,
    value: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: Arrayish,
    s: Arrayish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  rebase(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param asset Type: address, Indexed: false
   * @param kttWad Type: uint256, Indexed: false
   */
  redeem(asset: string, kttWad: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param asset Type: address, Indexed: false
   * @param oracle Type: address, Indexed: false
   */
  registerAsset(asset: string, oracle: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  registeredAssets(parameter0: BigNumberish, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param who Type: address, Indexed: false
   */
  scaledBalanceOf(who: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  scaledTotalSupply(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param pendingOwner_ Type: address, Indexed: false
   */
  setPendingOwner(pendingOwner_: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  symbol(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  totalSupply(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  totalValuation(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param tokens Type: uint256, Indexed: false
   */
  transfer(to: string, tokens: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   */
  transferAll(to: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   */
  transferAllFrom(from: string, to: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokens Type: uint256, Indexed: false
   */
  transferFrom(from: string, to: string, tokens: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param asset Type: address, Indexed: false
   * @param oracle Type: address, Indexed: false
   */
  updateAssetOracle(asset: string, oracle: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param asset Type: address, Indexed: false
   * @param recipient Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  withdrawAsset(asset: string, recipient: string, amount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
}
