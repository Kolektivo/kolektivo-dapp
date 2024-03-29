import { DI } from 'aurelia';

import type { LitNodeClient } from './lit-js-sdk';

import { Web3Provider } from '@ethersproject/providers/lib';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AuthSig = string | undefined;
export type EncryptionResult = { encryptedString: string; symmetricKey: string };

export type AuthSigData = {
  web3: Web3Provider;
  account: string;
  chainId: number;
};

export type EncryptionClient = {
  getAuthSig: (data: AuthSigData) => Promise<AuthSig>;
  encryptString: (data: string) => Promise<EncryptionResult>;
  decryptString: (data: string, key: unknown) => Promise<string>;
  uint8arrayToString: (data: Uint8Array, type: string) => string | undefined;
} & LitNodeClient;

export type IEncryptionClient = Promise<EncryptionClient> | EncryptionClient;

export const IEncryptionClient = DI.createInterface<IEncryptionClient>();
