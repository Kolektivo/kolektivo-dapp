import { BrowserStorageService, IBrowserStorageService } from './browser-storage-service';
import { CacheService, ICacheService } from './cache-service';
import { ContractService, IContractService } from 'services';
import { DI, IContainer, Registration } from 'aurelia';
import { EthereumService, IEthereumService, Networks } from './ethereum-service';
import { HttpService, IHttpService } from './http-service';
import { IIpfsService, IpfsService } from './ipfs-service';
import { IKolektivoIpfsClient, KolektivoIpfsClient } from './kolektivo-ipfs-service';
import { INumberService, NumberService } from './number-service';
import { IObserverService, ObserverService } from './observer-service';
import { ITimingService, TimingService } from './timing-service';
import { ethereumNetwork, isDev } from './../environment-variables';

export type IServices = Services;
export const IServices = DI.createInterface<Services>();

export class Services {
  constructor(
    @IHttpService public readonly httpService: IHttpService,
    @INumberService public readonly numberService: INumberService,
    @IIpfsService public readonly ipfsService: IIpfsService,
    @IKolektivoIpfsClient public readonly kolektivoService: IKolektivoIpfsClient,
    @IEthereumService public readonly ethereumService: IEthereumService,
    @IBrowserStorageService public readonly browserStorageService: IBrowserStorageService,
    @ITimingService public readonly timingService: ITimingService,
    @ICacheService public readonly cacheService: ICacheService,
    @IObserverService public readonly observerService: IObserverService,
    @IContractService public readonly contractService: IContractService,
  ) {}

  public initialize(): Promise<unknown> {
    const targetNetwork = ethereumNetwork ?? (isDev ? Networks.Alfajores : Networks.Celo);
    this.timingService.initialize(targetNetwork);
    this.ipfsService.initialize(this.kolektivoService);

    return this.ethereumService.initialize(targetNetwork);
  }

  public static register(container: IContainer): void {
    container
      .register(Registration.singleton(IServices, Services))
      .register(ObserverService)
      .register(TimingService)
      .register(CacheService)
      .register(HttpService)
      .register(NumberService)
      .register(IpfsService)
      .register(KolektivoIpfsClient)
      .register(EthereumService)
      .register(BrowserStorageService)
      .register(ContractService);
  }
}
