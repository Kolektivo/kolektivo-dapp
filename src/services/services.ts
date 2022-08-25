import { AxiosService, IAxiosService } from './axios-service';
import { BrowserStorageService, IBrowserStorageService } from './browser-storage-service';
import { ContractsDeploymentService, IContractsDeploymentService } from './contracts-deployment-service';
import { ContractsService, IContractsService } from './contracts-service';
import { DI, IContainer, Registration } from 'aurelia';
import { EthereumService, IEthereumService, Networks } from './ethereum-service';
import { IIpfsService, IpfsService } from './ipfs-service';
import { IKolektivoIpfsClient, KolektivoIpfsClient } from './kolektivo-ipfs-service';
import { INumberService, NumberService } from './number-service';
import { ITimingService, TimingService } from './timing-service';
import { ITokenListService, TokenListService } from './token-list-service';
import { ITokenService, TokenService } from './token-service';
import { ethereumNetwork, isDev } from './../environment-variables';

export type IServices = Services;
export const IServices = DI.createInterface<Services>();

export class Services {
  constructor(
    @IAxiosService public readonly axiosService: IAxiosService,
    @INumberService public readonly numberService: INumberService,
    @IIpfsService public readonly ipfsService: IIpfsService,
    @IKolektivoIpfsClient public readonly kolektivoService: IKolektivoIpfsClient,
    @IEthereumService public readonly ethereumService: IEthereumService,
    @IBrowserStorageService public readonly browserStorageService: IBrowserStorageService,
    @IContractsService public readonly contractsService: IContractsService,
    @IContractsDeploymentService public readonly contractsDeploymentService: IContractsDeploymentService,
    @ITokenService public readonly tokenService: ITokenService,
    @ITokenListService public readonly tokenListService: ITokenListService,
    @ITimingService public readonly timingService: ITimingService,
  ) {}

  public initialize(): Promise<unknown> {
    const targetNetwork = ethereumNetwork ?? (isDev ? Networks.Alfajores : Networks.Celo);
    this.timingService.initialize(targetNetwork);
    this.ipfsService.initialize(this.kolektivoService);
    return Promise.all([
      this.ethereumService.initialize(targetNetwork),
      this.contractsDeploymentService.initialize(targetNetwork).then(() => this.tokenService.initialize()),
    ]).then(() => this.contractsService.initialize());
  }

  public static register(container: IContainer): void {
    container
      .register(Registration.singleton(IServices, Services))
      .register(TimingService)
      .register(AxiosService)
      .register(NumberService)
      .register(IpfsService)
      .register(KolektivoIpfsClient)
      .register(EthereumService)
      .register(BrowserStorageService)
      .register(ContractsService)
      .register(TokenListService)
      .register(TokenService)
      .register(ContractsDeploymentService);
  }
}
