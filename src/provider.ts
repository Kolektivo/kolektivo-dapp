import { BaseProvider } from '@ethersproject/providers/lib/base-provider';
import { DI } from 'aurelia';

export type IReadOnlyProvider = BaseProvider;
export const IReadOnlyProvider = DI.createInterface<BaseProvider>();
