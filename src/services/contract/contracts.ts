import { ContractGroupsJson, GovernanceContractGroupJson, MonetaryContractsGroupJson } from './types';
import { IS_CELO } from 'environment-variables';
import governanceAlfajores from '../../contracts/governance/alfajores.json';
import governanceCelo from '../../contracts/governance/celo.json';
import governanceShared from '../../contracts/governance/sharedAbis.json';
import monetaryAlfajores from '../../contracts/monetary/alfajores.json';
import monetaryCelo from '../../contracts/monetary/celo.json';
import monetaryShared from '../../contracts/monetary/sharedAbis.json';

export { governanceAlfajores, governanceCelo, governanceShared, monetaryAlfajores, monetaryCelo, monetaryShared };

export const ContractGroupsJsons = {
  Monetary: { main: IS_CELO ? monetaryCelo : monetaryAlfajores, shared: monetaryShared },
  Governance: { main: IS_CELO ? governanceCelo : governanceAlfajores, shared: governanceShared },
};

export type ContractGroupsAbis = keyof typeof ContractGroupsJsons;

type ContractGroupJsons<T extends ContractGroupsJson = ContractGroupsJson> = {
  main: T;
  shared: T extends MonetaryContractsGroupJson ? typeof monetaryShared : typeof governanceShared;
};

/**
 * Get the Abis for a given contract json ABI group (like "Monetary").
 * A contract groups contain (main and shared) ABI files.  Each may contain
 * ABIs for multiple contracts that a pertinent to the given contract group.
 * Here you supply the group and the name of the contract within the group,
 * and you will receive the ABI for that contract.
 *
 * Example:
 *   const address: string = getContractAbi('Governance').main.contracts.monetaryBadger.address;
 *
 * @param type
 * @returns
 */
export function getContractAbi<
  T extends ContractGroupsAbis,
  TContractAbiJson extends ContractGroupsJson = T extends 'Monetary' ? MonetaryContractsGroupJson : GovernanceContractGroupJson,
>(type: T) {
  return ContractGroupsJsons[type] as ContractGroupJsons<TContractAbiJson>;
}
