import { governanceAlfajores, governanceCelo, governanceShared, monetaryAlfajores, monetaryCelo, monetaryShared } from './contracts';

export type MonetaryContractJson = typeof monetaryCelo | typeof monetaryAlfajores;
export type GovernanceContractJson = typeof governanceCelo | typeof governanceAlfajores;
export type ContractJson = MonetaryContractJson | GovernanceContractJson;
export type Shared = typeof governanceShared | typeof monetaryShared;
export type ContractsJson = ContractJson['contracts'];
export type MonetaryContracts = Extract<keyof MonetaryContractJson['contracts'], string>;
export type GovernanceContracts = Extract<keyof GovernanceContractJson['contracts'], string>;
