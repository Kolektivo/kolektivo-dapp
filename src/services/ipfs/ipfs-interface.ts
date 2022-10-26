import { DI } from 'aurelia';
import { IPFS } from 'ipfs-core-types/src';

export type IIpfsApi = IPFS;
export const IIpfsApi = DI.createInterface<IPFS>();
