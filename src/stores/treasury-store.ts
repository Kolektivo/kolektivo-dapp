import { BigNumber } from '@ethersproject/bignumber';
import { ContractNames, IContractsService } from '../services/contracts-service';
import { DI, IContainer, Registration } from 'aurelia';
import { INumberService } from './../services/number-service';
import { ITokenInfo, ITokenService, fromWei } from 'services';
// eslint-disable-next-line unused-imports/no-unused-imports
import { callOnce } from './../decorators/call-once';
import { erc20ContractContext } from 'models/erc20';
import { oracleContractContext } from 'models/oracle';
import { treasuryContractContext } from 'models/treasury';

export type ITreasuryStore = TreasuryStore;
export const ITreasuryStore = DI.createInterface<ITreasuryStore>('TreasuryStore');

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface TreasuryAsset {
  token: ITokenInfo;
  quantity: number;
}

export class TreasuryStore {
  public totalSupply?: BigNumber;
  public totalValuation?: BigNumber;
  public treasuryDistribution?: number;
  public reservesDistribution?: number;
  private treasuryContract?: treasuryContractContext;
  private treasuryAssets: TreasuryAsset[] = [];
  constructor(
    @IContractsService private readonly contractService: IContractsService,
    @ITokenService private readonly tokenService: ITokenService,
    @INumberService private readonly numberService: INumberService,
  ) {}

  public static register(container: IContainer): void {
    container.register(Registration.singleton(ITreasuryStore, TreasuryStore));
  }
  public get treasuryValue(): number {
    if (this.treasuryAssets.length === 0) return 0;
    return this.treasuryAssets.map((x) => this.getTotalPrice(x)).sum();
  }
  public async loadTokenData(): Promise<void> {
    if (this.totalValuation && this.totalSupply) return;
    const contract = this.getTreasuryContract();
    this.totalValuation = await contract?.totalValuation();
    this.totalSupply = await contract?.totalSupply();
    this.treasuryDistribution = (await this.getDistributionPercentage(ContractNames.TREASURY)).toNumber() / 100;
    this.reservesDistribution = (await this.getDistributionPercentage(ContractNames.RESERVE)).toNumber() / 100;
  }

  @callOnce()
  public async loadAssets(): Promise<void> {
    const contract = this.getTreasuryContract();
    if (!contract) return;
    const treasuryAddress = this.contractService.getContractAddress(ContractNames.TREASURY) ?? '';
    if (!treasuryAddress) return;

    //TODO: figure out the size of the array from the contract so we can do it async all
    //const arraySize = await this.contractService.getArraySize(treasuryAddress);
    //console.log('Array Size', BigNumber.from(arraySize).toNumber());

    let i = 0;
    while (i != -1) {
      try {
        const asset = await this.getTreasuryAsset(contract, treasuryAddress, i);
        if (asset) {
          this.treasuryAssets.push(asset);
        }
        i++;
      } catch (ex) {
        i = -1;
      }
    }
    // console.log('Treasury Assets', this.treasuryAssets);
  }

  private async getTreasuryAsset(contract: treasuryContractContext, treasuryAddress: string, i: number): Promise<TreasuryAsset | undefined> {
    const assetAddress = await contract.registeredAssets(BigNumber.from(i));
    //console.log('Address of asset', assetAddress);
    if (!assetAddress) return;
    //console.log('Token Info', tokenInfo);
    const oracleAddress = await contract.oraclePerAsset(assetAddress);
    //console.log('Address of asset', oracleAddress);
    if (!oracleAddress) return;
    const oracleContract = this.contractService.getContractAtAddress<oracleContractContext>(ContractNames.ORACLE, oracleAddress);

    //console.log('Contract from ContractService', oracleContract);
    const data = await oracleContract.getData();
    if (!data[1]) return; // if the oracleContract.getData() returns false don't use this token's data (according to Marvin G.)
    const tokenInfo = await this.tokenService.getTokenInfoFromAddress(assetAddress);
    // console.log('Token Info', tokenInfo);

    let tokenQuantity = BigNumber.from(1);
    if (!tokenInfo.id) {
      const tokenContract = this.tokenService.getTokenContract<erc20ContractContext & { queryFilter: (...args: unknown[]) => Promise<unknown> }>(
        assetAddress,
        tokenInfo.id,
      );
      //console.log('Token Contract', tokenContract);
      tokenQuantity = await tokenContract.balanceOf(treasuryAddress);
      //console.log('Token Balance', fromWei(tokenQuantity, 18));
      // const transfers = await tokenContract.queryFilter(tokenContract.filters.Transfer(undefined, treasuryAddress));
      // console.log('transfers', transfers);
    }
    //TODO make a copy of tokenInfo and update price
    tokenInfo.price = this.numberService.fromString(fromWei(data[0], 18)) ?? 0;

    // const assetsRegisteredFilter = contract.filters.AssetPriceUpdated(assetAddress, oracleAddress);

    // const assetsRegistered = contract.getPase(assetsRegisteredFilter, (first, second) => {
    //   console.log('first', first);
    //   console.log('second', second);
    // });

    return {
      quantity: parseFloat(fromWei(tokenQuantity, tokenInfo.decimals)),
      token: tokenInfo,
    } as TreasuryAsset;
  }

  public get circulatingDistribution(): number {
    if (this.treasuryDistribution == null || this.reservesDistribution == null) return 0;
    return 1 - (this.treasuryDistribution + this.reservesDistribution);
  }

  public get currentPrice(): BigNumber {
    if (!this.totalSupply || !this.totalValuation) return BigNumber.from(0);
    return this.totalSupply.div(this.totalValuation);
  }

  private async getDistributionPercentage(contractName: string): Promise<BigNumber> {
    const address = this.contractService.getContractAddress(contractName);
    if (!address || !this.totalSupply) return BigNumber.from(0);
    const tokens = await this.getTreasuryContract()?.balanceOf(address);
    return tokens?.div(this.totalSupply) ?? BigNumber.from(0);
  }

  private getTreasuryContract(): treasuryContractContext | null {
    if (this.treasuryContract) return this.treasuryContract;
    const treasuryAddress = this.contractService.getContractAddress(ContractNames.TREASURY);
    if (treasuryAddress) {
      this.treasuryContract = this.contractService.getContractAtAddress<treasuryContractContext>(
        ContractNames.TREASURY,
        treasuryAddress,
        this.contractService.createProvider(),
      );
      return this.treasuryContract;
    }
    return null;
  }
  private getTotalPrice(asset: TreasuryAsset): number {
    return asset.quantity * (asset.token.price ?? 0);
  }
}
