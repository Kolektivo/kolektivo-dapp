import { DI, IContainer, Registration } from 'aurelia';

import pkg from '../../package.json';

interface IStorage {
  /** Returns the current value associated with the given key, or null if the given key does not exist. */
  getItem(key: string): string | null;
  /**
   * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  removeItem(key: string): void;
  /**
   * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
   *
   * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  setItem(key: string, value: string): void;
}

interface IValue<T> {
  _version: string;
  data: T;
}
/**
 * local and session storage with package- and version-specific keys
 * and support for default values.
 */
export type IBrowserStorageService = BrowserStorageService;
export const IBrowserStorageService = DI.createInterface<IBrowserStorageService>('BrowserStorageService');
export class BrowserStorageService {
  private addVersion<T>(value: T, version: string): IValue<T> {
    return {
      data: value,
      _version: version,
    };
  }

  private getKey(key: string): string {
    return `${pkg.name}.${key}`;
  }

  private set(storage: IStorage, key: string, value: unknown, version?: string): void {
    const data = typeof version === 'string' ? this.addVersion(value, version) : value;
    storage.setItem(this.getKey(key), JSON.stringify(data));
  }

  private get<T>(storage: IStorage, key: string, defaultValue?: T, version?: string): T | undefined {
    const rawValue = storage.getItem(this.getKey(key));

    if (typeof rawValue === 'string') {
      try {
        const value = JSON.parse(rawValue) as string | IValue<T>;

        if (typeof version === 'string') {
          // then is versioned
          const versionedData = value as IValue<T>;
          return versionedData._version === version ? versionedData.data : defaultValue;
        } else {
          return value as unknown as T;
        }
      } catch (e) {
        return defaultValue;
      }
    }

    return defaultValue;
  }

  private remove(storage: IStorage, key: string): void {
    storage.removeItem(this.getKey(key));
  }

  public lsSet<T>(key: string, value: T, version?: string): void {
    this.set(localStorage, key, value, version);
  }

  public lsGet<T>(key: string, defaultValue?: T, version?: string): T | undefined {
    return this.get(localStorage, key, defaultValue, version);
  }

  public lsRemove(key: string): void {
    this.remove(localStorage, key);
  }

  public ssSet<T>(key: string, value: T, version?: string): void {
    this.set(sessionStorage, key, value, version);
  }

  public ssGet<T>(key: string, defaultValue?: T, version?: string): T | undefined {
    return this.get(sessionStorage, key, defaultValue, version);
  }

  public ssRemove(key: string): void {
    this.remove(sessionStorage, key);
  }

  public static register(container: IContainer) {
    Registration.singleton(IBrowserStorageService, BrowserStorageService).register(container);
  }
}
