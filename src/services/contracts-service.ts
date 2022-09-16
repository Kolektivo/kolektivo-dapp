import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';

import { ContractInterface, Signer, getDefaultProvider } from 'ethers';

import governanceAlfajores from '../contracts/governance/alfajores.json';
import governanceCelo from '../contracts/governance/celo.json';
import governanceShared from '../contracts/governance/sharedAbis.json';
import monetaryAlfajores from '../contracts/monetary/alfajores.json';
import monetaryCelo from '../contracts/monetary/celo.json';
import monetaryShared from '../contracts/monetary/sharedAbis.json';

type MonetaryContractJson = typeof monetaryCelo | typeof monetaryAlfajores;
type GovernanceContractJson = typeof governanceCelo | typeof governanceAlfajores;
type Shared = typeof governanceShared | typeof monetaryShared;
type Contracts = GovernanceContractJson['contracts'] | MonetaryContractJson['contracts'];
type MonetaryContracts = Extract<keyof MonetaryContractJson['contracts'], string>;
type GovernanceContracts = Extract<keyof GovernanceContractJson['contracts'], string>;

const endpoint = import.meta.env.KOL_NETWORK === 'Celo' ? 'https://celo.rpcs.dev:8545' : `https://alfajores.rpcs.dev:8545`;
const defaultProvider = getDefaultProvider(endpoint);

export const getMonetaryContract = <T extends Contract>(
  contract: MonetaryContracts,
  overrideAddress?: string,
  signerOrProvider?: Provider | Signer | undefined,
) => {
  const contractJson = import.meta.env.KOL_NETWORK === 'Celo' ? monetaryCelo : monetaryAlfajores;
  return getContract(contractJson.contracts, contract, monetaryShared, overrideAddress, signerOrProvider) as T;
};

export const getGovernanceContract = <T extends Contract>(
  contract: GovernanceContracts,
  overrideAddress?: string,
  signerOrProvider?: Provider | Signer | undefined,
) => {
  const contractJson = import.meta.env.KOL_NETWORK === 'Celo' ? governanceCelo : governanceAlfajores;
  return getContract(contractJson.contracts, contract, governanceShared, overrideAddress, signerOrProvider) as T;
};

const getContract = <T extends Contracts>(
  contractJson: T,
  contractName: Extract<keyof T, string>,
  sharedAbis: Shared,
  overrideAddress?: string,
  signerOrProvider?: Provider | Signer | undefined,
) => {
  const contract = contractJson[contractName] as unknown as { abi: string | ContractInterface; address: string };
  let abi = contract.abi;
  if (typeof abi === 'string') {
    const key = abi as keyof Shared;
    abi = sharedAbis[key] as ContractInterface;
  }
  return new Contract(overrideAddress ?? contract.address, contract.abi, signerOrProvider ?? defaultProvider);
};
