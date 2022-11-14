import type governanceCelo from '../../contracts/governance/celo.json';
import type governanceCeloTest from '../../contracts/governance/celo-test.json';
import type governanceShared from '../../contracts/governance/sharedAbis.json';
import type monetaryCelo from '../../contracts/monetary/celo.json';
import type monetaryCeloTest from '../../contracts/monetary/celo-test.json';
import type monetaryShared from '../../contracts/monetary/sharedAbis.json';

export { governanceCeloTest, governanceCelo, governanceShared, monetaryCeloTest, monetaryCelo, monetaryShared };

type Monetary = { main: typeof monetaryCeloTest & typeof monetaryCelo; shared: typeof monetaryShared };
type Governance = { main: typeof governanceCelo & typeof governanceCeloTest; shared: typeof governanceShared };

export type ContractGroupsJsons = {
  monetary: Monetary;
  governance: Governance;
};

export type ContractGroupsAbis = keyof ContractGroupsJsons;
