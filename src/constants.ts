import { AllowedNetworks } from 'models/allowed-network';
export const chainIdByName = new Map<AllowedNetworks, number>([
  [AllowedNetworks.Celo, 42220],
  [AllowedNetworks.Alfajores, 44787],
]);
