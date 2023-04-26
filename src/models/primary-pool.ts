// eslint-disable-next-line @typescript-eslint/naming-convention
export interface PrimaryPoolData {
  tokens: PrimaryPoolDataTokens[];
  volume: number;
  tvl: number;
  fees: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface PrimaryPoolDataTokens {
  symbol: string;
  icon: string;
}
