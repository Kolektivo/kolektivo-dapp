import { BytesLike as Arrayish } from '@ethersproject/bytes';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { ContractTransaction } from '@ethersproject/contracts';
/* eslint-disable @typescript-eslint/naming-convention */
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type ContractContext = EthersContractContextV5<Geonft, GeonftMethodNames, GeonftEventsContext, GeonftEvents>;

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
export type GeonftEvents = 'Approval' | 'ApprovalForAll' | 'NewOwner' | 'NewPendingOwner' | 'TokenModified' | 'Transfer';
export interface GeonftEventsContext {
  Approval(...parameters: any): EventFilter;
  ApprovalForAll(...parameters: any): EventFilter;
  NewOwner(...parameters: any): EventFilter;
  NewPendingOwner(...parameters: any): EventFilter;
  TokenModified(...parameters: any): EventFilter;
  Transfer(...parameters: any): EventFilter;
}
export type GeonftMethodNames =
  | 'new'
  | 'acceptOwnership'
  | 'approve'
  | 'balanceOf'
  | 'burn'
  | 'getApproved'
  | 'isApprovedForAll'
  | 'mint'
  | 'modify'
  | 'name'
  | 'owner'
  | 'ownerOf'
  | 'pendingOwner'
  | 'safeTransferFrom'
  | 'safeTransferFrom'
  | 'setApprovalForAll'
  | 'setPendingOwner'
  | 'supportsInterface'
  | 'symbol'
  | 'tokenData'
  | 'tokenURI'
  | 'transferFrom';
export interface ApprovalEventEmittedResponse {
  owner: string;
  spender: string;
  id: BigNumberish;
}
export interface ApprovalForAllEventEmittedResponse {
  owner: string;
  operator: string;
  approved: boolean;
}
export interface NewOwnerEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface NewPendingOwnerEventEmittedResponse {
  previousPendingOwner: string;
  newPendingOwner: string;
}
export interface TokenModifiedEventEmittedResponse {
  id: BigNumberish;
}
export interface TransferEventEmittedResponse {
  from: string;
  to: string;
  id: BigNumberish;
}
export interface TokenDataResponse {
  result0: BigNumber;
  0: BigNumber;
  result1: number;
  1: number;
  result2: number;
  2: number;
  result3: string;
  3: string;
  length: 4;
}
export interface Geonft {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param _name Type: string, Indexed: false
   * @param _symbol Type: string, Indexed: false
   */
  'new'(_name: string, _symbol: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
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
   * @param spender Type: address, Indexed: false
   * @param id Type: uint256, Indexed: false
   */
  approve(spender: string, id: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   */
  balanceOf(owner: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param id Type: uint256, Indexed: false
   */
  burn(id: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  getApproved(parameter0: BigNumberish, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: address, Indexed: false
   */
  isApprovedForAll(parameter0: string, parameter1: string, overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param latitude Type: int32, Indexed: false
   * @param longitude Type: int32, Indexed: false
   * @param identifier Type: string, Indexed: false
   */
  mint(
    to: string,
    latitude: BigNumberish,
    longitude: BigNumberish,
    identifier: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param id Type: uint256, Indexed: false
   * @param latitude Type: int32, Indexed: false
   * @param longitude Type: int32, Indexed: false
   * @param identifier Type: string, Indexed: false
   */
  modify(
    id: BigNumberish,
    latitude: BigNumberish,
    longitude: BigNumberish,
    identifier: string,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
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
   */
  owner(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param id Type: uint256, Indexed: false
   */
  ownerOf(id: BigNumberish, overrides?: ContractCallOverrides): Promise<string>;
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
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param id Type: uint256, Indexed: false
   */
  safeTransferFrom(from: string, to: string, id: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param id Type: uint256, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  safeTransferFrom(
    from: string,
    to: string,
    id: BigNumberish,
    data: Arrayish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param operator Type: address, Indexed: false
   * @param approved Type: bool, Indexed: false
   */
  setApprovalForAll(operator: string, approved: boolean, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
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
   * @param interfaceId Type: bytes4, Indexed: false
   */
  supportsInterface(interfaceId: Arrayish, overrides?: ContractCallOverrides): Promise<boolean>;
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
   * @param id Type: uint256, Indexed: false
   */
  tokenData(id: BigNumberish, overrides?: ContractCallOverrides): Promise<TokenDataResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param id Type: uint256, Indexed: false
   */
  tokenURI(id: BigNumberish, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param id Type: uint256, Indexed: false
   */
  transferFrom(from: string, to: string, id: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
}
