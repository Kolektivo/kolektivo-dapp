/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type vestingvaultContractContext = EthersContractContextV5<
  Vestingvault,
  VestingvaultMethodNames,
  VestingvaultEventsContext,
  VestingvaultEvents
>;

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
export type VestingvaultEvents = 'NewOwner' | 'NewPendingOwner';
export interface VestingvaultEventsContext {
  NewOwner(...parameters: any): EventFilter;
  NewPendingOwner(...parameters: any): EventFilter;
}
export type VestingvaultMethodNames =
  | 'acceptOwnership'
  | 'claim'
  | 'depositFor'
  | 'owner'
  | 'pendingOwner'
  | 'setPendingOwner'
  | 'token'
  | 'unvestedFor'
  | 'vestedFor';
export interface NewOwnerEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface NewPendingOwnerEventEmittedResponse {
  previousPendingOwner: string;
  newPendingOwner: string;
}
export interface Vestingvault {
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
   */
  claim(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param recipient Type: address, Indexed: false
   * @param amount Type: uint256, Indexed: false
   * @param vestingDuration Type: uint256, Indexed: false
   */
  depositFor(
    recipient: string,
    amount: BigNumberish,
    vestingDuration: BigNumberish,
    overrides?: ContractTransactionOverrides,
  ): Promise<ContractTransaction>;
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
   * @param pendingOwner_ Type: address, Indexed: false
   */
  setPendingOwner(pendingOwner_: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
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
   * @param recipient Type: address, Indexed: false
   */
  unvestedFor(recipient: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param recipient Type: address, Indexed: false
   */
  vestedFor(recipient: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
}
