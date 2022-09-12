import { defineConfig } from '@dethcrypto/eth-sdk';

export default defineConfig({
  contracts: {
    alfajores: {
      Treasury: '0x7521197233BD9235D2E39ad8D3D77c2843b2E837',
      Reserve: '0x61f99350eb8a181693639dF40F0C25371844fc32',
      Geonft: '0xc7D7407684c121d92f50440fC50353aefF6617b8',
    },
  },
});
