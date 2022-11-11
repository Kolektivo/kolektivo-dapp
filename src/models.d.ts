type RouteLink = { name: string; path: string; location?: 'top' | 'bottom'; icon?: string; isActive?: boolean };

interface IBlockInfoNative {
  hash: string;
  /**
   * previous block
   */
  parentHash: string;
  /**
   *The height(number) of this
   */
  number: number;
  timestamp: number;
  /**
   * The maximum amount of gas that this block was permitted to use. This is a value that can be voted up or voted down by miners and is used to automatically adjust the bandwidth requirements of the network.
   */
  gasLimit: BigNumber;
  /**
   * The total amount of gas used by all transactions in this
   */
  gasUsed: BigNumber;
  transactions: string[];
}

interface IBlockInfo extends IBlockInfoNative {
  blockDate: Date;
}

interface IChainEventInfo {
  chainId?: number;
  chainName?: AllowedNetworks;
  provider?: Web3Provider | null;
}
