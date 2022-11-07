import type governanceAlfajores from '../../contracts/governance/alfajores.json';
import type governanceCelo from '../../contracts/governance/celo.json';
import type governanceShared from '../../contracts/governance/sharedAbis.json';
import type monetaryAlfajores from '../../contracts/monetary/alfajores.json';
import type monetaryCelo from '../../contracts/monetary/celo.json';
import type monetaryShared from '../../contracts/monetary/sharedAbis.json';

export { governanceAlfajores, governanceCelo, governanceShared, monetaryAlfajores, monetaryCelo, monetaryShared };

type Monetary = { main: typeof monetaryAlfajores | typeof monetaryCelo; shared: typeof monetaryShared };
type Governance = { main: typeof governanceAlfajores | typeof governanceCelo; shared: typeof governanceShared };

export type ContractGroupsJsons = {
  monetary: Monetary;
  governance: Governance;
};

export type ContractGroupsAbis = keyof ContractGroupsJsons;
