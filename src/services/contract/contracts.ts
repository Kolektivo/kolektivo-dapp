import { isCelo, isDev } from 'environment-variables';
import governanceAlfajores from '../../contracts/governance/alfajores.json';
import governanceCelo from '../../contracts/governance/celo.json';
import governanceShared from '../../contracts/governance/sharedAbis.json';
import monetaryAlfajores from '../../contracts/monetary/alfajores.json';
import monetaryCelo from '../../contracts/monetary/celo.json';
import monetaryCeloTest from '../../contracts/monetary/celo-test.json';
import monetaryShared from '../../contracts/monetary/sharedAbis.json';

export const ContractGroupsJsons = {
  Monetary: { main: isCelo ? (isDev ? monetaryCeloTest : monetaryCelo) : monetaryAlfajores, shared: monetaryShared },
  Governance: { main: isCelo ? governanceCelo : governanceAlfajores, shared: governanceShared },
};

type MonetaryContractsGroupJson = typeof monetaryCelo | typeof monetaryAlfajores;
type GovernanceContractGroupJson = typeof governanceCelo | typeof governanceAlfajores;
type ContractGroupsJson = MonetaryContractsGroupJson | GovernanceContractGroupJson;
export type MonetarySharedContractName = keyof typeof monetaryShared;
export type GovernanceSharedContractName = keyof typeof governanceShared;
// export type SharedContractNames = keyof typeof governanceShared | keyof typeof monetaryShared;
// type ContractsAbi = ContractGroupsJson['contracts'];
// type MonetaryContractName = Extract<keyof MonetaryContractsGroupJson['contracts'], string>;
// type GovernanceContractName = Extract<keyof GovernanceContractGroupJson['contracts'], string>;

export type ContractGroupAbiNames = keyof typeof ContractGroupsJsons;

type ContractGroupJsons<T extends ContractGroupsJson> = {
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
  T extends ContractGroupAbiNames,
  TContractAbiJson extends ContractGroupsJson = T extends 'Monetary' ? MonetaryContractsGroupJson : GovernanceContractGroupJson,
>(type: T) {
  return ContractGroupsJsons[type] as ContractGroupJsons<TContractAbiJson>;
}
