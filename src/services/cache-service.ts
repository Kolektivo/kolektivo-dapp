import { DI, IContainer, Registration } from 'aurelia';

export type ICacheService = CacheService;
export const ICacheService = DI.createInterface<ICacheService>('CacheService');

export class CacheService {
  private readonly cache = new Map<string, unknown>();

  public setItem(key: string, item: unknown): void {
    this.cache.set(key, item);
  }

  public getItem(key: string): unknown | undefined {
    return this.cache.get(key);
  }

  public static register(container: IContainer) {
    Registration.singleton(ICacheService, CacheService).register(container);
  }
}
