type BlockChainState = {
  walletConnected: boolean;
  connectedWalletAddress: string;
  badges: Badge[];
  transactions: Transaction[];
};

type TransactionStatus = 'success' | 'failed' | 'pending';

type Transaction = {
  id: string;
  status: TransactionStatus;
  fromAmount: number;
  fromToken: string;
  from: string;
  toAmount: number;
  toToken: string;
  to: string;
  date: string;
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
  circulatingExternal?: number;
};

type RouteLink = { name: string; path: string; location: 'top' | 'bottom'; icon?: string };
