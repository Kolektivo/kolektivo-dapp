import { AxiosService, IAxiosService } from './AxiosService';
import { BrowserStorageService, IBrowserStorageService } from './BrowserStorageService';
import { ContractsDeploymentProvider, IContractsDeploymentProvider } from './ContractsDeploymentProvider';
import { ContractsService, IContractsService } from './ContractsService';
import { DI, IContainer, Registration } from 'aurelia';
import { DateService, IDateService } from './DateService';
import { EthereumService, IEthereumService, Networks } from './ethereum-service';
import { IIpfsService, IpfsService } from './IpfsService';
import { IKolektivoIpfsClient, KolektivoIpfsClient } from './KolektivoIpfsClient';
import { INumberService, NumberService } from './NumberService';
import { ITokenListProvider, TokenListProvider } from './TokenListProvider';
import { ITokenService, TokenService } from './TokenService';
import { ethereumNetwork, isDev } from './../environment-variables';

export type IServices = Services;
export const IServices = DI.createInterface<Services>();

export class Services {
  constructor(
    @IAxiosService public readonly axiosService: IAxiosService,
    @INumberService public readonly numberService: INumberService,
    @IDateService public readonly dateService: IDateService,
    @IIpfsService public readonly ipfsService: IIpfsService,
    @IKolektivoIpfsClient public readonly kolektivoService: IKolektivoIpfsClient,
    @IEthereumService public readonly ethereumService: IEthereumService,
    @IBrowserStorageService public readonly browserStorageService: IBrowserStorageService,
    @IContractsService public readonly contractsService: IContractsService,
    @IContractsDeploymentProvider public readonly contractsDeploymentProvider: IContractsDeploymentProvider,
    @ITokenService public readonly tokenService: ITokenService,
    @ITokenListProvider public readonly tokenListProvider: ITokenListProvider,
  ) {}

  public async initialize() {
    await this.ethereumService.initialize(ethereumNetwork ?? (isDev ? Networks.Alfajores : Networks.Celo));
    if (!this.ethereumService.targetedNetwork) return;
    await this.contractsDeploymentProvider.initialize(this.ethereumService.targetedNetwork);
    this.contractsService.initialize();
    this.ipfsService.initialize(this.kolektivoService);
    await this.tokenService.initialize();
  }

  public static register(container: IContainer): void {
    container
      .register(Registration.singleton(IServices, Services))
      .register(AxiosService)
      .register(NumberService)
      .register(DateService)
      .register(IpfsService)
      .register(KolektivoIpfsClient)
      .register(EthereumService)
      .register(BrowserStorageService)
      .register(ContractsService)
      .register(TokenService)
      .register(TokenListProvider)
      .register(ContractsDeploymentProvider);
  }
}
