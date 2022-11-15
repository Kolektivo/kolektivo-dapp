import { DI } from 'aurelia';

import { CeloProvider } from '@celo-tools/celo-ethers-wrapper';
import { IConfiguration } from 'configurations/configuration';
import { cache } from 'decorators/cache';
import { ICacheService } from 'services/cache-service';

export type IProviderFactory = CeloProviderFactory;
export const IProviderFactory = DI.createInterface<IProviderFactory>();

export class CeloProviderFactory {
  constructor(@ICacheService private readonly cacheService: ICacheService, @IConfiguration private readonly configuration: IConfiguration) {}

  @cache<CeloProviderFactory>(function () {
    return { storage: this.cacheService };
  })
  create(address: string) {
    return new CeloProvider(this.configuration.chainUrl).getSigner(address);
  }
}
