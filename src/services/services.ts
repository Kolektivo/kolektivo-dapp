import { BrowserStorageService, IBrowserStorageService } from './browser-storage-service';
import { CacheService, ICacheService } from './cache-service';
import { ContractService, IContractService } from './contract/contract-service';
import { DI, IContainer, Registration } from 'aurelia';
import { EncryptionService, IEncryptionService } from './encryption-service';
import { EthereumService, IEthereumService } from './ethereum-service';
import { HttpService, IHttpService } from './http-service';
import { IIpfsService, IpfsService } from './ipfs/ipfs-service';
import { INumberService, NumberService } from './number-service';
import { IObserverService, ObserverService } from './observer-service';
import { ITimingService, TimingService } from './timing-service';
import { ITokenService, TokenService } from './token-service';

export type IServices = Services;
export const IServices = DI.createInterface<Services>();

export class Services {
  constructor(
    @IHttpService public readonly httpService: IHttpService,
    @INumberService public readonly numberService: INumberService,
    @IEthereumService public readonly ethereumService: IEthereumService,
    @IBrowserStorageService public readonly browserStorageService: IBrowserStorageService,
    @ITimingService public readonly timingService: ITimingService,
    @ICacheService public readonly cacheService: ICacheService,
    @IObserverService public readonly observerService: IObserverService,
    @IEncryptionService public readonly encryptionService: IEncryptionService,
    @IContractService public readonly contractService: IContractService,
    @ITokenService public readonly tokenService: ITokenService,
    @IIpfsService public readonly ipfsService: IIpfsService,
  ) {}

  public static register(container: IContainer): void {
    container
      .register(Registration.singleton(IServices, Services))
      .register(ObserverService)
      .register(TimingService)
      .register(CacheService)
      .register(HttpService)
      .register(NumberService)
      .register(EthereumService)
      .register(EncryptionService)
      .register(BrowserStorageService)
      .register(IpfsService)
      .register(ContractService)
      .register(TokenService);
  }
}
