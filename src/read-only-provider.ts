import { DI } from 'aurelia';
import { Provider } from '@ethersproject/providers/lib';

export type IReadOnlyProvider = Provider;
export const IReadOnlyProvider = DI.createInterface<IReadOnlyProvider>();
