import { DI } from 'aurelia';
import { Web3Provider } from '@ethersproject/providers/lib';
import type LitJsSdk from 'lit-js-sdk';

export type AuthSig = unknown;
export type EncryptionResult = { encryptedString: string; symmetricKey: string };

export type AuthSigData = {
  web3: Web3Provider;
  account: string;
  chainId: number;
};

export type IEncryptionClient = {
  getAuthSig: (data: AuthSigData) => Promise<AuthSig>;
  encryptString: (data: string) => Promise<EncryptionResult>;
  decryptString: (data: string, key: unknown) => Promise<string>;
  uint8arrayToString: (data: Uint8Array, type: string) => string | undefined;
} & LitJsSdk.LitNodeClient;

export const IEncryptionClient = DI.createInterface<IEncryptionClient>();
