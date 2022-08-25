/* eslint-disable @typescript-eslint/naming-convention */
import { BytesLike as Arrayish, BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<Reserve, ReserveMethodNames, ReserveEventsContext, ReserveEvents>;

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
export type ReserveEvents =
  | 'BackingUpdated'
  | 'BondedERC20'
  | 'BondedERC721'
  | 'DebtIncurred'
  | 'DebtPayed'
  | 'ERC20DelistedAsBondable'
  | 'ERC20DelistedAsRedeemable'
  | 'ERC20Deregistered'
  | 'ERC20ListedAsBondable'
  | 'ERC20ListedAsRedeemable'
  | 'ERC20Registered'
  | 'ERC721IdDelistedAsBondable'
  | 'ERC721IdDelistedAsRedeemable'
  | 'ERC721IdDeregistered'
  | 'ERC721IdListedAsBondable'
  | 'ERC721IdListedAsRedeemable'
  | 'ERC721IdRegistered'
  | 'NewOwner'
  | 'NewPendingOwner'
  | 'RedeemedERC20'
  | 'RedeemedERC721Id'
  | 'SetERC20BondingDiscount'
  | 'SetERC20BondingLimit'
  | 'SetERC20BondingVesting'
  | 'SetERC20Oracle'
  | 'SetERC20RedeemLimit'
  | 'SetERC721IdBondingDiscount'
  | 'SetERC721IdBondingVesting'
  | 'SetERC721IdOracle'
  | 'SetMinBacking'
  | 'SetTokenOracle'
  | 'SetVestingVault';
export interface ReserveEventsContext {
  BackingUpdated(...parameters: any): EventFilter;
  BondedERC20(...parameters: any): EventFilter;
  BondedERC721(...parameters: any): EventFilter;
  DebtIncurred(...parameters: any): EventFilter;
  DebtPayed(...parameters: any): EventFilter;
  ERC20DelistedAsBondable(...parameters: any): EventFilter;
  ERC20DelistedAsRedeemable(...parameters: any): EventFilter;
  ERC20Deregistered(...parameters: any): EventFilter;
  ERC20ListedAsBondable(...parameters: any): EventFilter;
  ERC20ListedAsRedeemable(...parameters: any): EventFilter;
  ERC20Registered(...parameters: any): EventFilter;
  ERC721IdDelistedAsBondable(...parameters: any): EventFilter;
  ERC721IdDelistedAsRedeemable(...parameters: any): EventFilter;
  ERC721IdDeregistered(...parameters: any): EventFilter;
  ERC721IdListedAsBondable(...parameters: any): EventFilter;
  ERC721IdListedAsRedeemable(...parameters: any): EventFilter;
  ERC721IdRegistered(...parameters: any): EventFilter;
  NewOwner(...parameters: any): EventFilter;
  NewPendingOwner(...parameters: any): EventFilter;
  RedeemedERC20(...parameters: any): EventFilter;
  RedeemedERC721Id(...parameters: any): EventFilter;
  SetERC20BondingDiscount(...parameters: any): EventFilter;
  SetERC20BondingLimit(...parameters: any): EventFilter;
  SetERC20BondingVesting(...parameters: any): EventFilter;
  SetERC20Oracle(...parameters: any): EventFilter;
  SetERC20RedeemLimit(...parameters: any): EventFilter;
  SetERC721IdBondingDiscount(...parameters: any): EventFilter;
  SetERC721IdBondingVesting(...parameters: any): EventFilter;
  SetERC721IdOracle(...parameters: any): EventFilter;
  SetMinBacking(...parameters: any): EventFilter;
  SetTokenOracle(...parameters: any): EventFilter;
  SetVestingVault(...parameters: any): EventFilter;
}
export type ReserveMethodNames =
  | 'new'
  | 'acceptOwnership'
  | 'bondERC20'
  | 'bondERC20All'
  | 'bondERC20AllFrom'
  | 'bondERC20AllFromTo'
  | 'bondERC20AllTo'
  | 'bondERC20From'
  | 'bondERC20FromTo'
  | 'bondERC20To'
  | 'bondERC721Id'
  | 'bondERC721IdFrom'
  | 'bondERC721IdFromTo'
  | 'bondERC721IdTo'
  | 'bondingDiscountPerERC20'
  | 'bondingDiscountPerERC721Id'
  | 'bondingLimitPerERC20'
  | 'bondingVestingDurationPerERC20'
  | 'bondingVestingDurationPerERC721Id'
  | 'delistERC20AsBondable'
  | 'delistERC20AsRedeemable'
  | 'delistERC721IdAsBondable'
  | 'delistERC721IdAsRedeemable'
  | 'deregisterERC20'
  | 'deregisterERC721Id'
  | 'executeTx'
  | 'hashOfERC721Id'
  | 'incurDebt'
  | 'isERC20Bondable'
  | 'isERC20Redeemable'
  | 'isERC721IdBondable'
  | 'isERC721IdRedeemable'
  | 'listERC20AsBondable'
  | 'listERC20AsRedeemable'
  | 'listERC721IdAsBondable'
  | 'listERC721IdAsRedeemable'
  | 'minBacking'
  | 'onERC721Received'
  | 'oraclePerERC20'
  | 'oraclePerERC721Id'
  | 'owner'
  | 'payDebt'
  | 'pendingOwner'
  | 'redeemERC20'
  | 'redeemERC20All'
  | 'redeemERC20AllFrom'
  | 'redeemERC20AllFromTo'
  | 'redeemERC20AllTo'
  | 'redeemERC20From'
  | 'redeemERC20FromTo'
  | 'redeemERC20To'
  | 'redeemERC721Id'
  | 'redeemERC721IdFrom'
  | 'redeemERC721IdFromTo'
  | 'redeemERC721IdTo'
  | 'redeemLimitPerERC20'
  | 'registerERC20'
  | 'registerERC721Id'
  | 'registeredERC20s'
  | 'registeredERC20sSize'
  | 'registeredERC721Ids'
  | 'registeredERC721IdsSize'
  | 'reserveStatus'
  | 'setBondingDiscountForERC20'
  | 'setBondingDiscountForERC721Id'
  | 'setBondingVestingForERC20'
  | 'setBondingVestingForERC721Id'
  | 'setERC20BondingLimit'
  | 'setERC20RedeemLimit'
  | 'setMinBacking'
  | 'setPendingOwner'
  | 'setTokenOracle'
  | 'setVestingVault'
  | 'token'
  | 'tokenOracle'
  | 'updateOracleForERC20'
  | 'updateOracleForERC721Id'
  | 'vestingVault'
  | 'withdrawERC20'
  | 'withdrawERC721Id';
export interface BackingUpdatedEventEmittedResponse {
  oldBacking: BigNumberish;
  newBacking: BigNumberish;
}
export interface BondedERC20EventEmittedResponse {
  erc20: string;
  erc20sBonded: BigNumberish;
  tokensMinted: BigNumberish;
}
export interface BondedERC721EventEmittedResponse {
  erc721Id: Erc721IdRequest;
  tokensMinted: BigNumberish;
}
export interface DebtIncurredEventEmittedResponse {
  tokenAmount: BigNumberish;
}
export interface DebtPayedEventEmittedResponse {
  tokenAmount: BigNumberish;
}
export interface ERC20DelistedAsBondableEventEmittedResponse {
  erc20: string;
}
export interface ERC20DelistedAsRedeemableEventEmittedResponse {
  erc20: string;
}
export interface ERC20DeregisteredEventEmittedResponse {
  erc20: string;
}
export interface ERC20ListedAsBondableEventEmittedResponse {
  erc20: string;
}
export interface ERC20ListedAsRedeemableEventEmittedResponse {
  erc20: string;
}
export interface ERC20RegisteredEventEmittedResponse {
  erc20: string;
}
export interface ERC721IdDelistedAsBondableEventEmittedResponse {
  erc721Id: Erc721IdRequest;
}
export interface ERC721IdDelistedAsRedeemableEventEmittedResponse {
  erc721Id: Erc721IdRequest;
}
export interface ERC721IdDeregisteredEventEmittedResponse {
  erc721Id: Erc721IdRequest;
}
export interface ERC721IdListedAsBondableEventEmittedResponse {
  erc721Id: Erc721IdRequest;
}
export interface ERC721IdListedAsRedeemableEventEmittedResponse {
  erc721Id: Erc721IdRequest;
}
export interface ERC721IdRegisteredEventEmittedResponse {
  erc721Id: Erc721IdRequest;
}
export interface NewOwnerEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface NewPendingOwnerEventEmittedResponse {
  previousPendingOwner: string;
  newPendingOwner: string;
}
export interface RedeemedERC20EventEmittedResponse {
  erc20: string;
  erc20sRedeemed: BigNumberish;
  tokensBurned: BigNumberish;
}
export interface RedeemedERC721IdEventEmittedResponse {
  erc721Id: Erc721IdRequest;
  tokensBurned: BigNumberish;
}
export interface SetERC20BondingDiscountEventEmittedResponse {
  erc20: string;
  oldDiscount: BigNumberish;
  newDiscount: BigNumberish;
}
export interface SetERC20BondingLimitEventEmittedResponse {
  erc20: string;
  oldLimit: BigNumberish;
  newLimit: BigNumberish;
}
export interface SetERC20BondingVestingEventEmittedResponse {
  erc20: string;
  oldVestingDuration: BigNumberish;
  newVestingDuration: BigNumberish;
}
export interface SetERC20OracleEventEmittedResponse {
  erc20: string;
  oldOracle: string;
  newOracle: string;
}
export interface SetERC20RedeemLimitEventEmittedResponse {
  erc20: string;
  oldLimit: BigNumberish;
  newLimit: BigNumberish;
}
export interface SetERC721IdBondingDiscountEventEmittedResponse {
  erc721Id: Erc721IdRequest;
  oldDiscount: BigNumberish;
  newDiscount: BigNumberish;
}
export interface SetERC721IdBondingVestingEventEmittedResponse {
  erc721Id: Erc721IdRequest;
  oldVestingDuration: BigNumberish;
  newVestingDuration: BigNumberish;
}
export interface SetERC721IdOracleEventEmittedResponse {
  erc721Id: Erc721IdRequest;
  oldOracle: string;
  newOracle: string;
}
export interface SetMinBackingEventEmittedResponse {
  oldMinBacking: BigNumberish;
  newMinBacking: BigNumberish;
}
export interface SetTokenOracleEventEmittedResponse {
  oldOracle: string;
  newOracle: string;
}
export interface SetVestingVaultEventEmittedResponse {
  oldVestingVault: string;
  newVestingVault: string;
}
export interface BondERC721IdRequest {
  erc721: string;
  id: BigNumberish;
}
export interface BondERC721IdFromRequest {
  erc721: string;
  id: BigNumberish;
}
export interface BondERC721IdFromToRequest {
  erc721: string;
  id: BigNumberish;
}
export interface BondERC721IdToRequest {
  erc721: string;
  id: BigNumberish;
}
export interface DelistERC721IdAsBondableRequest {
  erc721: string;
  id: BigNumberish;
}
export interface DelistERC721IdAsRedeemableRequest {
  erc721: string;
  id: BigNumberish;
}
export interface DeregisterERC721IdRequest {
  erc721: string;
  id: BigNumberish;
}
export interface HashOfERC721IdRequest {
  erc721: string;
  id: BigNumberish;
}
export interface ListERC721IdAsBondableRequest {
  erc721: string;
  id: BigNumberish;
}
export interface ListERC721IdAsRedeemableRequest {
  erc721: string;
  id: BigNumberish;
}
export interface RedeemERC721IdRequest {
  erc721: string;
  id: BigNumberish;
}
export interface RedeemERC721IdFromRequest {
  erc721: string;
  id: BigNumberish;
}
export interface RedeemERC721IdFromToRequest {
  erc721: string;
  id: BigNumberish;
}
export interface RedeemERC721IdToRequest {
  erc721: string;
  id: BigNumberish;
}
export interface RegisterERC721IdRequest {
  erc721: string;
  id: BigNumberish;
}
export interface RegisteredERC721IdsResponse {
  erc721: string;
  0: string;
  id: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface ReserveStatusResponse {
  result0: BigNumber;
  0: BigNumber;
  result1: BigNumber;
  1: BigNumber;
  result2: BigNumber;
  2: BigNumber;
  length: 3;
}
export interface SetBondingDiscountForERC721IdRequest {
  erc721: string;
  id: BigNumberish;
}
export interface SetBondingVestingForERC721IdRequest {
  erc721: string;
  id: BigNumberish;
}
export interface UpdateOracleForERC721IdRequest {
  erc721: string;
  id: BigNumberish;
}
export interface WithdrawERC721IdRequest {
  erc721: string;
  id: BigNumberish;
}
export interface Reserve {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param token_ Type: address, Indexed: false
   * @param tokenOracle_ Type: address, Indexed: false
   * @param vestingVault_ Type: address, Indexed: false
   * @param minBacking_ Type: uint256, Indexed: false
   */
  'new'(
    token_: string,
    tokenOracle_: string,
    vestingVault_: string,
    minBacking_: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  acceptOwnership(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   * @param erc20Amount Type: uint256, Indexed: false
   */
  bondERC20(erc20: string, erc20Amount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   */
  bondERC20All(erc20: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   * @param from Type: address, Indexed: false
   */
  bondERC20AllFrom(erc20: string, from: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   */
  bondERC20AllFromTo(erc20: string, from: string, to: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   */
  bondERC20AllTo(erc20: string, to: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   * @param from Type: address, Indexed: false
   * @param erc20Amount Type: uint256, Indexed: false
   */
  bondERC20From(erc20: string, from: string, erc20Amount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param erc20Amount Type: uint256, Indexed: false
   */
  bondERC20FromTo(
    erc20: string,
    from: string,
    to: string,
    erc20Amount: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param erc20Amount Type: uint256, Indexed: false
   */
  bondERC20To(erc20: string, to: string, erc20Amount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc721Id Type: tuple, Indexed: false
   */
  bondERC721Id(erc721Id: BondERC721IdRequest, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc721Id Type: tuple, Indexed: false
   * @param from Type: address, Indexed: false
   */
  bondERC721IdFrom(erc721Id: BondERC721IdFromRequest, from: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc721Id Type: tuple, Indexed: false
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   */
  bondERC721IdFromTo(
    erc721Id: BondERC721IdFromToRequest,
    from: string,
    to: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc721Id Type: tuple, Indexed: false
   * @param to Type: address, Indexed: false
   */
  bondERC721IdTo(erc721Id: BondERC721IdToRequest, to: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  bondingDiscountPerERC20(parameter0: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: bytes32, Indexed: false
   */
  bondingDiscountPerERC721Id(parameter0: Arrayish, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  bondingLimitPerERC20(parameter0: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  bondingVestingDurationPerERC20(parameter0: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: bytes32, Indexed: false
   */
  bondingVestingDurationPerERC721Id(parameter0: Arrayish, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   */
  delistERC20AsBondable(erc20: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   */
  delistERC20AsRedeemable(erc20: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc721Id Type: tuple, Indexed: false
   */
  delistERC721IdAsBondable(erc721Id: DelistERC721IdAsBondableRequest, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc721Id Type: tuple, Indexed: false
   */
  delistERC721IdAsRedeemable(erc721Id: DelistERC721IdAsRedeemableRequest, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   */
  deregisterERC20(erc20: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc721Id Type: tuple, Indexed: false
   */
  deregisterERC721Id(erc721Id: DeregisterERC721IdRequest, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param target Type: address, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  executeTx(target: string, data: Arrayish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: pure
   * Type: function
   * @param erc721Id Type: tuple, Indexed: false
   */
  hashOfERC721Id(erc721Id: HashOfERC721IdRequest, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amount Type: uint256, Indexed: false
   */
  incurDebt(amount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  isERC20Bondable(parameter0: string, overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  isERC20Redeemable(parameter0: string, overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: bytes32, Indexed: false
   */
  isERC721IdBondable(parameter0: Arrayish, overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: bytes32, Indexed: false
   */
  isERC721IdRedeemable(parameter0: Arrayish, overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   */
  listERC20AsBondable(erc20: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   */
  listERC20AsRedeemable(erc20: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc721Id Type: tuple, Indexed: false
   */
  listERC721IdAsBondable(erc721Id: ListERC721IdAsBondableRequest, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc721Id Type: tuple, Indexed: false
   */
  listERC721IdAsRedeemable(erc721Id: ListERC721IdAsRedeemableRequest, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  minBacking(overrides?: ContractCallOverrides): Promise<BigNumber>;
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
  oraclePerERC20(parameter0: string, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: bytes32, Indexed: false
   */
  oraclePerERC721Id(parameter0: Arrayish, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  owner(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param amount Type: uint256, Indexed: false
   */
  payDebt(amount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
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
   * @param erc20 Type: address, Indexed: false
   * @param tokenAmount Type: uint256, Indexed: false
   */
  redeemERC20(erc20: string, tokenAmount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   */
  redeemERC20All(erc20: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   * @param from Type: address, Indexed: false
   */
  redeemERC20AllFrom(erc20: string, from: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   */
  redeemERC20AllFromTo(erc20: string, from: string, to: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   */
  redeemERC20AllTo(erc20: string, to: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   * @param from Type: address, Indexed: false
   * @param tokenAmount Type: uint256, Indexed: false
   */
  redeemERC20From(erc20: string, from: string, tokenAmount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokenAmount Type: uint256, Indexed: false
   */
  redeemERC20FromTo(
    erc20: string,
    from: string,
    to: string,
    tokenAmount: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokenAmount Type: uint256, Indexed: false
   */
  redeemERC20To(erc20: string, to: string, tokenAmount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc721Id Type: tuple, Indexed: false
   */
  redeemERC721Id(erc721Id: RedeemERC721IdRequest, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc721Id Type: tuple, Indexed: false
   * @param from Type: address, Indexed: false
   */
  redeemERC721IdFrom(erc721Id: RedeemERC721IdFromRequest, from: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc721Id Type: tuple, Indexed: false
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   */
  redeemERC721IdFromTo(
    erc721Id: RedeemERC721IdFromToRequest,
    from: string,
    to: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc721Id Type: tuple, Indexed: false
   * @param to Type: address, Indexed: false
   */
  redeemERC721IdTo(erc721Id: RedeemERC721IdToRequest, to: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  redeemLimitPerERC20(parameter0: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   * @param oracle Type: address, Indexed: false
   */
  registerERC20(erc20: string, oracle: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc721Id Type: tuple, Indexed: false
   * @param oracle Type: address, Indexed: false
   */
  registerERC721Id(erc721Id: RegisterERC721IdRequest, oracle: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  registeredERC20s(parameter0: BigNumberish, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  registeredERC20sSize(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  registeredERC721Ids(parameter0: BigNumberish, overrides?: ContractCallOverrides): Promise<RegisteredERC721IdsResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  registeredERC721IdsSize(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  reserveStatus(overrides?: ContractCallOverrides): Promise<ReserveStatusResponse>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   * @param discount Type: uint256, Indexed: false
   */
  setBondingDiscountForERC20(erc20: string, discount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc721Id Type: tuple, Indexed: false
   * @param discount Type: uint256, Indexed: false
   */
  setBondingDiscountForERC721Id(
    erc721Id: SetBondingDiscountForERC721IdRequest,
    discount: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   * @param vestingDuration Type: uint256, Indexed: false
   */
  setBondingVestingForERC20(erc20: string, vestingDuration: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc721Id Type: tuple, Indexed: false
   * @param vestingDuration Type: uint256, Indexed: false
   */
  setBondingVestingForERC721Id(
    erc721Id: SetBondingVestingForERC721IdRequest,
    vestingDuration: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   * @param limit Type: uint256, Indexed: false
   */
  setERC20BondingLimit(erc20: string, limit: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   * @param limit Type: uint256, Indexed: false
   */
  setERC20RedeemLimit(erc20: string, limit: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param minBacking_ Type: uint256, Indexed: false
   */
  setMinBacking(minBacking_: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
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
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenOracle_ Type: address, Indexed: false
   */
  setTokenOracle(tokenOracle_: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param vestingVault_ Type: address, Indexed: false
   */
  setVestingVault(vestingVault_: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  token(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  tokenOracle(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   * @param oracle Type: address, Indexed: false
   */
  updateOracleForERC20(erc20: string, oracle: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc721Id Type: tuple, Indexed: false
   * @param oracle Type: address, Indexed: false
   */
  updateOracleForERC721Id(
    erc721Id: UpdateOracleForERC721IdRequest,
    oracle: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  vestingVault(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc20 Type: address, Indexed: false
   * @param recipient Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   */
  withdrawERC20(erc20: string, recipient: string, amount: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param erc721Id Type: tuple, Indexed: false
   * @param recipient Type: address, Indexed: false
   */
  withdrawERC721Id(erc721Id: WithdrawERC721IdRequest, recipient: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
}
