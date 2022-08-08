import { AllowedNetworks, Networks } from 'services';
/**
 * key is the network name, value is an array of urls to TokenLists.
 */
type ITokenInfoReposByNetwork = Map<AllowedNetworks, string[]>;
/**
 * Map of the TokenLists used on each network
 */
export const TokenLists: ITokenInfoReposByNetwork = new Map([
  [
    Networks.Mainnet,
    [
      'https://raw.githubusercontent.com/PrimeDAO/tokenlists/main/primePayment.json',
      'https://storageapi.fleek.co/balancer-team-bucket/assets/listed.tokenlist.json',
    ],
  ],
  [
    Networks.Alfajores,
    [
      'https://raw.githubusercontent.com/PrimeDAO/tokenlists/main/primePayment.json',
      'https://storageapi.fleek.co/balancer-team-bucket/assets/listed.tokenlist.json',
    ],
  ],
]);
