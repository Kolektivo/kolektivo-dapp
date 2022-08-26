/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { BigNumber, BigNumberish, ContractTransaction } from 'ethers';
import { EthersContractContextV5 } from 'ethereum-abi-types-generator';

export type oracleContractContext = EthersContractContextV5<Oracle, OracleMethodNames, OracleEventsContext, OracleEvents>;

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
export type OracleEvents =
  | 'MinimumProvidersChanged'
  | 'NewOwner'
  | 'NewPendingOwner'
  | 'OracleMarkedAsInvalid'
  | 'OracleMarkedAsValid'
  | 'ProviderAdded'
  | 'ProviderRemoved'
  | 'ProviderReportPushed'
  | 'ProviderReportsPurged';
export interface OracleEventsContext {
  MinimumProvidersChanged(...parameters: any): EventFilter;
  NewOwner(...parameters: any): EventFilter;
  NewPendingOwner(...parameters: any): EventFilter;
  OracleMarkedAsInvalid(...parameters: any): EventFilter;
  OracleMarkedAsValid(...parameters: any): EventFilter;
  ProviderAdded(...parameters: any): EventFilter;
  ProviderRemoved(...parameters: any): EventFilter;
  ProviderReportPushed(...parameters: any): EventFilter;
  ProviderReportsPurged(...parameters: any): EventFilter;
}
export type OracleMethodNames =
  | 'new'
  | 'acceptOwnership'
  | 'addProvider'
  | 'getData'
  | 'isValid'
  | 'minimumProviders'
  | 'owner'
  | 'pendingOwner'
  | 'providerReports'
  | 'providers'
  | 'providersSize'
  | 'purgeReports'
  | 'purgeReportsFrom'
  | 'pushReport'
  | 'removeProvider'
  | 'reportDelay'
  | 'reportExpirationTime'
  | 'setIsValid'
  | 'setMinimumProviders'
  | 'setPendingOwner';
export interface MinimumProvidersChangedEventEmittedResponse {
  oldMinimumProviders: BigNumberish;
  newMinimumProviders: BigNumberish;
}
export interface NewOwnerEventEmittedResponse {
  previousOwner: string;
  newOwner: string;
}
export interface NewPendingOwnerEventEmittedResponse {
  previousPendingOwner: string;
  newPendingOwner: string;
}
export interface ProviderAddedEventEmittedResponse {
  provider: string;
}
export interface ProviderRemovedEventEmittedResponse {
  provider: string;
}
export interface ProviderReportPushedEventEmittedResponse {
  provider: string;
  payload: BigNumberish;
  timestamp: BigNumberish;
}
export interface ProviderReportsPurgedEventEmittedResponse {
  purger: string;
  provider: string;
}
export interface GetDataResponse {
  result0: BigNumber;
  0: BigNumber;
  result1: boolean;
  1: boolean;
  length: 2;
}
export interface ProviderReportsResponse {
  timestamp: BigNumber;
  0: BigNumber;
  payload: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface Oracle {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param reportExpirationTime_ Type: uint256, Indexed: false
   * @param reportDelay_ Type: uint256, Indexed: false
   * @param minimumProviders_ Type: uint256, Indexed: false
   */
  'new'(
    reportExpirationTime_: BigNumberish,
    reportDelay_: BigNumberish,
    minimumProviders_: BigNumberish,
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
   * @param provider Type: address, Indexed: false
   */
  addProvider(provider: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getData(overrides?: ContractCallOverrides): Promise<GetDataResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  isValid(overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  minimumProviders(overrides?: ContractCallOverrides): Promise<BigNumber>;
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
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   * @param parameter1 Type: uint256, Indexed: false
   */
  providerReports(parameter0: string, parameter1: BigNumberish, overrides?: ContractCallOverrides): Promise<ProviderReportsResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: uint256, Indexed: false
   */
  providers(parameter0: BigNumberish, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  providersSize(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   */
  purgeReports(overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param provider Type: address, Indexed: false
   */
  purgeReportsFrom(provider: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param payload Type: uint256, Indexed: false
   */
  pushReport(payload: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param provider Type: address, Indexed: false
   */
  removeProvider(provider: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  reportDelay(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  reportExpirationTime(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param isValid_ Type: bool, Indexed: false
   */
  setIsValid(isValid_: boolean, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param minimumProviders_ Type: uint256, Indexed: false
   */
  setMinimumProviders(minimumProviders_: BigNumberish, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param pendingOwner_ Type: address, Indexed: false
   */
  setPendingOwner(pendingOwner_: string, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
}
