import { DI } from 'aurelia';
import type { IPFS } from 'ipfs-core-types/src';

export type IIpfsApi = IPFS;
export const IIpfsApi = DI.createInterface<IPFS>();
