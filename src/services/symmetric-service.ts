/* eslint-disable no-console */
import { DI, IContainer, Registration } from 'aurelia';

import * as ethers from 'ethers';
import { gql, GraphQLClient } from 'graphql-request';
type SwapData = {
  swaps: [{ tokenOut: string; tokenAmountOut: string; timestamp: number }];
};
type PoolData = {
  pool: { swapFee: string; totalSwapFee: string; totalLiquidity: string; totalSwapVolume: string };
};
type PriceData = {
  token: { latestPrice: { price: string; pricingAsset: string } };
};
export type ISymmetricService = SymmetricService;
export const ISymmetricService = DI.createInterface<ISymmetricService>('SymmetricService');

// for time being, you can use following pool ID
const poolId = '0xfe4a8b11fd4735e96454b056cf6422aacad1c88000020000000000000000001b'; // SYMM-cUSD pool
const cUSDAddress = '0x765de816845861e75a25fca122bb6898b8b1282a';

export class SymmetricService {
  public static register(container: IContainer) {
    Registration.singleton(ISymmetricService, SymmetricService).register(container);
  }

  // _poolId: poolid is constant and will be provided by backend.
  // ethers: just pass directly imported ethers

  public indexVolumeAndFees = async (_poolId = poolId) => {
    // graphql endpoint
    const endpoint = 'https://api.thegraph.com/subgraphs/name/centfinance/symmetric-v2-celo';

    // setup client to interact with graphql endpoint
    const client = new GraphQLClient(endpoint);

    // calculate 24h period
    const startTime = Math.floor(Number(new Date(new Date().getTime() - 24 * 60 * 60 * 1000)) / 1000);

    // queries
    // swap query - this helps to fetch all the swaps that happened since start time to latest time for given pool id
    const swapQuery = gql`
      query getSwaps($poolId: String!, $startTime: Int!) {
        swaps(where: { and: [{ poolId: $poolId }, { timestamp_gte: $startTime }] }) {
          tokenOut
          tokenAmountOut
          timestamp
        }
      }
    `;
    // variables for swap query
    const swapVariables = {
      poolId: _poolId,
      startTime: startTime,
    };

    // fee query - this helps to fetch swap fee as well as other pool related details, if needed more details can be fetched easily
    const feeQuery = gql`
      query getPoolData($poolId: String!) {
        pool(id: $poolId) {
          swapFee
          totalSwapFee
          totalLiquidity
          totalSwapVolume
        }
      }
    `;
    // variables for fee query
    const feeVariables = {
      poolId: _poolId,
    };

    // price query - this helps to fetch price of a token in terms of other token (mostly for our case we need to fetch price with pricing asset being cUSD)
    const priceQuery = gql`
      query getPrice($tokenAddress: String!) {
        token(id: $tokenAddress) {
          latestPrice {
            price
            pricingAsset
          }
        }
      }
    `;

    // query data
    const { swaps: swapData } = await client.request<SwapData>(swapQuery, swapVariables);
    const { pool: poolData } = await client.request<PoolData>(feeQuery, feeVariables);

    // calculate total amount of a token that was traded
    const totalSwapAmountPerToken: Record<string, string | undefined> = {};
    // price of each token in cUSD
    const tokenPrice: Record<string, string | undefined> = {};

    // loop over all swap data to tally total swap amount in last 24 hour for each token
    swapData.forEach((element) => {
      // if entry for token doesn't exist, that means token encountered first time
      const val = totalSwapAmountPerToken[element.tokenOut] ?? '0';
      // as the amount is given in decimal, we need to convert the token amount to 10^18 denomination
      const exisitingAmount = ethers.utils.parseEther(val);
      // same goes here, the amount needs to be first converted to 10^18 denomination to get rid of decimals
      const amount = ethers.utils.parseEther(element.tokenAmountOut);
      // after adding, convert the amount to normal token denomination
      totalSwapAmountPerToken[element.tokenOut] = ethers.utils.formatEther(ethers.BigNumber.from(amount).add(exisitingAmount));
    });
    // extract all array of token addresses that were swapped
    const tokenAddresses = Object.keys(totalSwapAmountPerToken);
    // fetch price for each token
    await Promise.all(
      tokenAddresses.map(async (element) => {
        // setup variable for token price query
        const priceVariable = {
          tokenAddress: element,
        };
        // if the token is cUSD, set the price to 1
        if (element === cUSDAddress) {
          tokenPrice[element] = '1';
          return;
        }
        const data = await client.request<PriceData>(priceQuery, priceVariable);
        const price = data.token.latestPrice.price;
        tokenPrice[element] = price;
      }),
    );
    //console.log(totalSwapAmountPerToken, tokenPrice, poolData.swapFee);
    // calculate volume
    // todo: the logic to calculate volume is remaining
    // volume = total amount of tokens traded in cUSD = token1TradedAmount * token1Price + token2TradedAmount * token2Price
    const volumeUnparsed = tokenAddresses.reduce((accu, element) => {
      const x = ethers.utils.parseEther(totalSwapAmountPerToken[element] ?? '0').mul(ethers.utils.parseEther(tokenPrice[element]?.toString().slice(0, 20) ?? '0'));
      return x.add(accu);
    }, ethers.BigNumber.from(0));
    // fees = total volume traded * swapFee;
    const swapFeeUnparsed = volumeUnparsed.mul(ethers.utils.parseEther(poolData.swapFee.toString())).div(ethers.utils.parseEther('1'));

    // as the volume was in denomination of 10^36, we need to adjust the denomination
    const volumeParsed = ethers.utils.formatUnits(volumeUnparsed, '36');
    const swapFeeParsed = ethers.utils.formatUnits(swapFeeUnparsed, '36');

    // total value locked in USD
    const tvl = poolData.totalLiquidity;

    // final values
    //console.log(volumeParsed, swapFeeParsed, tvl);
    return { volumeParsed, swapFeeParsed, tvl };
  };
}
