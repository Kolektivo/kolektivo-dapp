type BlockChainState = {
  walletConnected: boolean;
  connectedWalletAddress: string;
  badges: Badge[];
};

type Badge = {
  name: string;
  description?: string;
  imageUrl?: string;
};

type TokenInfo = {
  marketCap: number;
  currentPrice: number;
  totalSupply: number;
  supplyDistribution: SupplyDistribution;
};

type SupplyDistribution = {
  treasury: number;
  reserves: number;
  circulating: number;
};

type RouteLink = { name: string; path: string; location: 'top' | 'bottom'; icon?: string };
