import { Networks } from '../services';
/**
 * key is the network name, value is an array of urls to TokenLists.
 */
type ITokenInfoReposByNetwork = Map<AllowedNetworks, string[]>;
/**
 * Map of the TokenLists used on each network
 */
export const TokenLists: ITokenInfoReposByNetwork = new Map([
  [Networks.Celo, ['https://raw.githubusercontent.com/Kolektivo/tokenlists/main/tokenlist.json']],
  [Networks.Alfajores, ['https://raw.githubusercontent.com/Kolektivo/tokenlists/main/tokenlist.json']],
]);
