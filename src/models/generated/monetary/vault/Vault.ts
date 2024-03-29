/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace IVault {
  export type BatchSwapStepStruct = {
    poolId: PromiseOrValue<BytesLike>;
    assetInIndex: PromiseOrValue<BigNumberish>;
    assetOutIndex: PromiseOrValue<BigNumberish>;
    amount: PromiseOrValue<BigNumberish>;
    userData: PromiseOrValue<BytesLike>;
  };

  export type BatchSwapStepStructOutput = [
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    string
  ] & {
    poolId: string;
    assetInIndex: BigNumber;
    assetOutIndex: BigNumber;
    amount: BigNumber;
    userData: string;
  };

  export type FundManagementStruct = {
    sender: PromiseOrValue<string>;
    fromInternalBalance: PromiseOrValue<boolean>;
    recipient: PromiseOrValue<string>;
    toInternalBalance: PromiseOrValue<boolean>;
  };

  export type FundManagementStructOutput = [
    string,
    boolean,
    string,
    boolean
  ] & {
    sender: string;
    fromInternalBalance: boolean;
    recipient: string;
    toInternalBalance: boolean;
  };

  export type ExitPoolRequestStruct = {
    assets: PromiseOrValue<string>[];
    minAmountsOut: PromiseOrValue<BigNumberish>[];
    userData: PromiseOrValue<BytesLike>;
    toInternalBalance: PromiseOrValue<boolean>;
  };

  export type ExitPoolRequestStructOutput = [
    string[],
    BigNumber[],
    string,
    boolean
  ] & {
    assets: string[];
    minAmountsOut: BigNumber[];
    userData: string;
    toInternalBalance: boolean;
  };

  export type JoinPoolRequestStruct = {
    assets: PromiseOrValue<string>[];
    maxAmountsIn: PromiseOrValue<BigNumberish>[];
    userData: PromiseOrValue<BytesLike>;
    fromInternalBalance: PromiseOrValue<boolean>;
  };

  export type JoinPoolRequestStructOutput = [
    string[],
    BigNumber[],
    string,
    boolean
  ] & {
    assets: string[];
    maxAmountsIn: BigNumber[];
    userData: string;
    fromInternalBalance: boolean;
  };

  export type PoolBalanceOpStruct = {
    kind: PromiseOrValue<BigNumberish>;
    poolId: PromiseOrValue<BytesLike>;
    token: PromiseOrValue<string>;
    amount: PromiseOrValue<BigNumberish>;
  };

  export type PoolBalanceOpStructOutput = [
    number,
    string,
    string,
    BigNumber
  ] & { kind: number; poolId: string; token: string; amount: BigNumber };

  export type SingleSwapStruct = {
    poolId: PromiseOrValue<BytesLike>;
    kind: PromiseOrValue<BigNumberish>;
    assetIn: PromiseOrValue<string>;
    assetOut: PromiseOrValue<string>;
    amount: PromiseOrValue<BigNumberish>;
    userData: PromiseOrValue<BytesLike>;
  };

  export type SingleSwapStructOutput = [
    string,
    number,
    string,
    string,
    BigNumber,
    string
  ] & {
    poolId: string;
    kind: number;
    assetIn: string;
    assetOut: string;
    amount: BigNumber;
    userData: string;
  };
}

export interface VaultInterface extends utils.Interface {
  functions: {
    "WETH()": FunctionFragment;
    "batchSwap(uint8,(bytes32,uint256,uint256,uint256,bytes)[],address[],(address,bool,address,bool),int256[],uint256)": FunctionFragment;
    "deregisterTokens(bytes32,address[])": FunctionFragment;
    "exitPool(bytes32,address,address,(address[],uint256[],bytes,bool))": FunctionFragment;
    "getPool(bytes32)": FunctionFragment;
    "getPoolTokenInfo(bytes32,address)": FunctionFragment;
    "getPoolTokens(bytes32)": FunctionFragment;
    "joinPool(bytes32,address,address,(address[],uint256[],bytes,bool))": FunctionFragment;
    "managePoolBalance((uint8,bytes32,address,uint256)[])": FunctionFragment;
    "queryBatchSwap(uint8,(bytes32,uint256,uint256,uint256,bytes)[],address[],(address,bool,address,bool))": FunctionFragment;
    "registerPool(uint8)": FunctionFragment;
    "registerTokens(bytes32,address[],address[])": FunctionFragment;
    "swap((bytes32,uint8,address,address,uint256,bytes),(address,bool,address,bool),uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "WETH"
      | "batchSwap"
      | "deregisterTokens"
      | "exitPool"
      | "getPool"
      | "getPoolTokenInfo"
      | "getPoolTokens"
      | "joinPool"
      | "managePoolBalance"
      | "queryBatchSwap"
      | "registerPool"
      | "registerTokens"
      | "swap"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "WETH", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "batchSwap",
    values: [
      PromiseOrValue<BigNumberish>,
      IVault.BatchSwapStepStruct[],
      PromiseOrValue<string>[],
      IVault.FundManagementStruct,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "deregisterTokens",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "exitPool",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      IVault.ExitPoolRequestStruct
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "getPool",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getPoolTokenInfo",
    values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getPoolTokens",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "joinPool",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      IVault.JoinPoolRequestStruct
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "managePoolBalance",
    values: [IVault.PoolBalanceOpStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "queryBatchSwap",
    values: [
      PromiseOrValue<BigNumberish>,
      IVault.BatchSwapStepStruct[],
      PromiseOrValue<string>[],
      IVault.FundManagementStruct
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "registerPool",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerTokens",
    values: [
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>[],
      PromiseOrValue<string>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "swap",
    values: [
      IVault.SingleSwapStruct,
      IVault.FundManagementStruct,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(functionFragment: "WETH", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "batchSwap", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "deregisterTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "exitPool", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getPool", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPoolTokenInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPoolTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "joinPool", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "managePoolBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "queryBatchSwap",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerPool",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;

  events: {
    "PoolBalanceChanged(bytes32,address,address[],int256[],uint256[])": EventFragment;
    "PoolBalanceManaged(bytes32,address,address,int256,int256)": EventFragment;
    "PoolRegistered(bytes32,address,uint8)": EventFragment;
    "Swap(bytes32,address,address,uint256,uint256)": EventFragment;
    "TokensDeregistered(bytes32,address[])": EventFragment;
    "TokensRegistered(bytes32,address[],address[])": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "PoolBalanceChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PoolBalanceManaged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PoolRegistered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Swap"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokensDeregistered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokensRegistered"): EventFragment;
}

export interface PoolBalanceChangedEventObject {
  poolId: string;
  liquidityProvider: string;
  tokens: string[];
  deltas: BigNumber[];
  protocolFeeAmounts: BigNumber[];
}
export type PoolBalanceChangedEvent = TypedEvent<
  [string, string, string[], BigNumber[], BigNumber[]],
  PoolBalanceChangedEventObject
>;

export type PoolBalanceChangedEventFilter =
  TypedEventFilter<PoolBalanceChangedEvent>;

export interface PoolBalanceManagedEventObject {
  poolId: string;
  assetManager: string;
  token: string;
  cashDelta: BigNumber;
  managedDelta: BigNumber;
}
export type PoolBalanceManagedEvent = TypedEvent<
  [string, string, string, BigNumber, BigNumber],
  PoolBalanceManagedEventObject
>;

export type PoolBalanceManagedEventFilter =
  TypedEventFilter<PoolBalanceManagedEvent>;

export interface PoolRegisteredEventObject {
  poolId: string;
  poolAddress: string;
  specialization: number;
}
export type PoolRegisteredEvent = TypedEvent<
  [string, string, number],
  PoolRegisteredEventObject
>;

export type PoolRegisteredEventFilter = TypedEventFilter<PoolRegisteredEvent>;

export interface SwapEventObject {
  poolId: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: BigNumber;
  amountOut: BigNumber;
}
export type SwapEvent = TypedEvent<
  [string, string, string, BigNumber, BigNumber],
  SwapEventObject
>;

export type SwapEventFilter = TypedEventFilter<SwapEvent>;

export interface TokensDeregisteredEventObject {
  poolId: string;
  tokens: string[];
}
export type TokensDeregisteredEvent = TypedEvent<
  [string, string[]],
  TokensDeregisteredEventObject
>;

export type TokensDeregisteredEventFilter =
  TypedEventFilter<TokensDeregisteredEvent>;

export interface TokensRegisteredEventObject {
  poolId: string;
  tokens: string[];
  assetManagers: string[];
}
export type TokensRegisteredEvent = TypedEvent<
  [string, string[], string[]],
  TokensRegisteredEventObject
>;

export type TokensRegisteredEventFilter =
  TypedEventFilter<TokensRegisteredEvent>;

export interface Vault extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VaultInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    WETH(overrides?: CallOverrides): Promise<[string]>;

    batchSwap(
      kind: PromiseOrValue<BigNumberish>,
      swaps: IVault.BatchSwapStepStruct[],
      assets: PromiseOrValue<string>[],
      funds: IVault.FundManagementStruct,
      limits: PromiseOrValue<BigNumberish>[],
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deregisterTokens(
      poolId: PromiseOrValue<BytesLike>,
      tokens: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    exitPool(
      poolId: PromiseOrValue<BytesLike>,
      sender: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      request: IVault.ExitPoolRequestStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getPool(
      poolId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, number]>;

    getPoolTokenInfo(
      poolId: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, string] & {
        cash: BigNumber;
        managed: BigNumber;
        lastChangeBlock: BigNumber;
        assetManager: string;
      }
    >;

    getPoolTokens(
      poolId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [string[], BigNumber[], BigNumber] & {
        tokens: string[];
        balances: BigNumber[];
        lastChangeBlock: BigNumber;
      }
    >;

    joinPool(
      poolId: PromiseOrValue<BytesLike>,
      sender: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      request: IVault.JoinPoolRequestStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    managePoolBalance(
      ops: IVault.PoolBalanceOpStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    queryBatchSwap(
      kind: PromiseOrValue<BigNumberish>,
      swaps: IVault.BatchSwapStepStruct[],
      assets: PromiseOrValue<string>[],
      funds: IVault.FundManagementStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerPool(
      specialization: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerTokens(
      poolId: PromiseOrValue<BytesLike>,
      tokens: PromiseOrValue<string>[],
      assetManagers: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    swap(
      singleSwap: IVault.SingleSwapStruct,
      funds: IVault.FundManagementStruct,
      limit: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  WETH(overrides?: CallOverrides): Promise<string>;

  batchSwap(
    kind: PromiseOrValue<BigNumberish>,
    swaps: IVault.BatchSwapStepStruct[],
    assets: PromiseOrValue<string>[],
    funds: IVault.FundManagementStruct,
    limits: PromiseOrValue<BigNumberish>[],
    deadline: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deregisterTokens(
    poolId: PromiseOrValue<BytesLike>,
    tokens: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  exitPool(
    poolId: PromiseOrValue<BytesLike>,
    sender: PromiseOrValue<string>,
    recipient: PromiseOrValue<string>,
    request: IVault.ExitPoolRequestStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getPool(
    poolId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<[string, number]>;

  getPoolTokenInfo(
    poolId: PromiseOrValue<BytesLike>,
    token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, string] & {
      cash: BigNumber;
      managed: BigNumber;
      lastChangeBlock: BigNumber;
      assetManager: string;
    }
  >;

  getPoolTokens(
    poolId: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<
    [string[], BigNumber[], BigNumber] & {
      tokens: string[];
      balances: BigNumber[];
      lastChangeBlock: BigNumber;
    }
  >;

  joinPool(
    poolId: PromiseOrValue<BytesLike>,
    sender: PromiseOrValue<string>,
    recipient: PromiseOrValue<string>,
    request: IVault.JoinPoolRequestStruct,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  managePoolBalance(
    ops: IVault.PoolBalanceOpStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  queryBatchSwap(
    kind: PromiseOrValue<BigNumberish>,
    swaps: IVault.BatchSwapStepStruct[],
    assets: PromiseOrValue<string>[],
    funds: IVault.FundManagementStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerPool(
    specialization: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerTokens(
    poolId: PromiseOrValue<BytesLike>,
    tokens: PromiseOrValue<string>[],
    assetManagers: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  swap(
    singleSwap: IVault.SingleSwapStruct,
    funds: IVault.FundManagementStruct,
    limit: PromiseOrValue<BigNumberish>,
    deadline: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    WETH(overrides?: CallOverrides): Promise<string>;

    batchSwap(
      kind: PromiseOrValue<BigNumberish>,
      swaps: IVault.BatchSwapStepStruct[],
      assets: PromiseOrValue<string>[],
      funds: IVault.FundManagementStruct,
      limits: PromiseOrValue<BigNumberish>[],
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    deregisterTokens(
      poolId: PromiseOrValue<BytesLike>,
      tokens: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    exitPool(
      poolId: PromiseOrValue<BytesLike>,
      sender: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      request: IVault.ExitPoolRequestStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    getPool(
      poolId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string, number]>;

    getPoolTokenInfo(
      poolId: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, string] & {
        cash: BigNumber;
        managed: BigNumber;
        lastChangeBlock: BigNumber;
        assetManager: string;
      }
    >;

    getPoolTokens(
      poolId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [string[], BigNumber[], BigNumber] & {
        tokens: string[];
        balances: BigNumber[];
        lastChangeBlock: BigNumber;
      }
    >;

    joinPool(
      poolId: PromiseOrValue<BytesLike>,
      sender: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      request: IVault.JoinPoolRequestStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    managePoolBalance(
      ops: IVault.PoolBalanceOpStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    queryBatchSwap(
      kind: PromiseOrValue<BigNumberish>,
      swaps: IVault.BatchSwapStepStruct[],
      assets: PromiseOrValue<string>[],
      funds: IVault.FundManagementStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    registerPool(
      specialization: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    registerTokens(
      poolId: PromiseOrValue<BytesLike>,
      tokens: PromiseOrValue<string>[],
      assetManagers: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    swap(
      singleSwap: IVault.SingleSwapStruct,
      funds: IVault.FundManagementStruct,
      limit: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {
    "PoolBalanceChanged(bytes32,address,address[],int256[],uint256[])"(
      poolId?: PromiseOrValue<BytesLike> | null,
      liquidityProvider?: PromiseOrValue<string> | null,
      tokens?: null,
      deltas?: null,
      protocolFeeAmounts?: null
    ): PoolBalanceChangedEventFilter;
    PoolBalanceChanged(
      poolId?: PromiseOrValue<BytesLike> | null,
      liquidityProvider?: PromiseOrValue<string> | null,
      tokens?: null,
      deltas?: null,
      protocolFeeAmounts?: null
    ): PoolBalanceChangedEventFilter;

    "PoolBalanceManaged(bytes32,address,address,int256,int256)"(
      poolId?: PromiseOrValue<BytesLike> | null,
      assetManager?: PromiseOrValue<string> | null,
      token?: PromiseOrValue<string> | null,
      cashDelta?: null,
      managedDelta?: null
    ): PoolBalanceManagedEventFilter;
    PoolBalanceManaged(
      poolId?: PromiseOrValue<BytesLike> | null,
      assetManager?: PromiseOrValue<string> | null,
      token?: PromiseOrValue<string> | null,
      cashDelta?: null,
      managedDelta?: null
    ): PoolBalanceManagedEventFilter;

    "PoolRegistered(bytes32,address,uint8)"(
      poolId?: PromiseOrValue<BytesLike> | null,
      poolAddress?: PromiseOrValue<string> | null,
      specialization?: null
    ): PoolRegisteredEventFilter;
    PoolRegistered(
      poolId?: PromiseOrValue<BytesLike> | null,
      poolAddress?: PromiseOrValue<string> | null,
      specialization?: null
    ): PoolRegisteredEventFilter;

    "Swap(bytes32,address,address,uint256,uint256)"(
      poolId?: PromiseOrValue<BytesLike> | null,
      tokenIn?: PromiseOrValue<string> | null,
      tokenOut?: PromiseOrValue<string> | null,
      amountIn?: null,
      amountOut?: null
    ): SwapEventFilter;
    Swap(
      poolId?: PromiseOrValue<BytesLike> | null,
      tokenIn?: PromiseOrValue<string> | null,
      tokenOut?: PromiseOrValue<string> | null,
      amountIn?: null,
      amountOut?: null
    ): SwapEventFilter;

    "TokensDeregistered(bytes32,address[])"(
      poolId?: PromiseOrValue<BytesLike> | null,
      tokens?: null
    ): TokensDeregisteredEventFilter;
    TokensDeregistered(
      poolId?: PromiseOrValue<BytesLike> | null,
      tokens?: null
    ): TokensDeregisteredEventFilter;

    "TokensRegistered(bytes32,address[],address[])"(
      poolId?: PromiseOrValue<BytesLike> | null,
      tokens?: null,
      assetManagers?: null
    ): TokensRegisteredEventFilter;
    TokensRegistered(
      poolId?: PromiseOrValue<BytesLike> | null,
      tokens?: null,
      assetManagers?: null
    ): TokensRegisteredEventFilter;
  };

  estimateGas: {
    WETH(overrides?: CallOverrides): Promise<BigNumber>;

    batchSwap(
      kind: PromiseOrValue<BigNumberish>,
      swaps: IVault.BatchSwapStepStruct[],
      assets: PromiseOrValue<string>[],
      funds: IVault.FundManagementStruct,
      limits: PromiseOrValue<BigNumberish>[],
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deregisterTokens(
      poolId: PromiseOrValue<BytesLike>,
      tokens: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    exitPool(
      poolId: PromiseOrValue<BytesLike>,
      sender: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      request: IVault.ExitPoolRequestStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getPool(
      poolId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoolTokenInfo(
      poolId: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPoolTokens(
      poolId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    joinPool(
      poolId: PromiseOrValue<BytesLike>,
      sender: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      request: IVault.JoinPoolRequestStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    managePoolBalance(
      ops: IVault.PoolBalanceOpStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    queryBatchSwap(
      kind: PromiseOrValue<BigNumberish>,
      swaps: IVault.BatchSwapStepStruct[],
      assets: PromiseOrValue<string>[],
      funds: IVault.FundManagementStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerPool(
      specialization: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerTokens(
      poolId: PromiseOrValue<BytesLike>,
      tokens: PromiseOrValue<string>[],
      assetManagers: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    swap(
      singleSwap: IVault.SingleSwapStruct,
      funds: IVault.FundManagementStruct,
      limit: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    WETH(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    batchSwap(
      kind: PromiseOrValue<BigNumberish>,
      swaps: IVault.BatchSwapStepStruct[],
      assets: PromiseOrValue<string>[],
      funds: IVault.FundManagementStruct,
      limits: PromiseOrValue<BigNumberish>[],
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deregisterTokens(
      poolId: PromiseOrValue<BytesLike>,
      tokens: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    exitPool(
      poolId: PromiseOrValue<BytesLike>,
      sender: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      request: IVault.ExitPoolRequestStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getPool(
      poolId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPoolTokenInfo(
      poolId: PromiseOrValue<BytesLike>,
      token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPoolTokens(
      poolId: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    joinPool(
      poolId: PromiseOrValue<BytesLike>,
      sender: PromiseOrValue<string>,
      recipient: PromiseOrValue<string>,
      request: IVault.JoinPoolRequestStruct,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    managePoolBalance(
      ops: IVault.PoolBalanceOpStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    queryBatchSwap(
      kind: PromiseOrValue<BigNumberish>,
      swaps: IVault.BatchSwapStepStruct[],
      assets: PromiseOrValue<string>[],
      funds: IVault.FundManagementStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerPool(
      specialization: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerTokens(
      poolId: PromiseOrValue<BytesLike>,
      tokens: PromiseOrValue<string>[],
      assetManagers: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    swap(
      singleSwap: IVault.SingleSwapStruct,
      funds: IVault.FundManagementStruct,
      limit: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
