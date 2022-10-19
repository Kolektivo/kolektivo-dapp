import { governanceAlfajores, governanceCelo, governanceShared, monetaryAlfajores, monetaryCelo, monetaryShared } from './contracts';

export type MonetaryContractsGroupJson = typeof monetaryCelo | typeof monetaryAlfajores;
export type GovernanceContractGroupJson = typeof governanceCelo | typeof governanceAlfajores;
export type ContractGroupsJson = MonetaryContractsGroupJson | GovernanceContractGroupJson;
export type ContractGroupsSharedJson = typeof governanceShared | typeof monetaryShared;
export type ContractsAbi = ContractGroupsJson['contracts'];
export type MonetaryContractAbi = Extract<keyof MonetaryContractsGroupJson['contracts'], string>;
export type GovernanceContractAbi = Extract<keyof GovernanceContractGroupJson['contracts'], string>;
