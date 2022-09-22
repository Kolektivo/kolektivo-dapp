import { ContractJson, Shared } from './types';
import { isCelo } from 'environment-variables';
import governanceAlfajores from '../../contracts/governance/alfajores.json';
import governanceCelo from '../../contracts/governance/celo.json';
import governanceShared from '../../contracts/governance/sharedAbis.json';
import monetaryAlfajores from '../../contracts/monetary/alfajores.json';
import monetaryCelo from '../../contracts/monetary/celo.json';
import monetaryShared from '../../contracts/monetary/sharedAbis.json';

export { governanceAlfajores, governanceCelo, governanceShared, monetaryAlfajores, monetaryCelo, monetaryShared };
export type ContractDetails<T extends ContractJson = ContractJson> = { main: T; shared: Shared };

export type ContractType = keyof typeof Contracts;

export const Contracts = {
  Monetary: { main: isCelo ? monetaryCelo : monetaryAlfajores, shared: monetaryShared },
  Governance: { main: isCelo ? governanceCelo : governanceAlfajores, shared: governanceShared },
};

export function getContract<T extends ContractType, TContractJson extends ContractJson>(type: T) {
  return Contracts[type] as ContractDetails<TContractJson>;
}
