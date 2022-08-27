import { DI, IContainer, ILogger, Registration } from 'aurelia';
import { Hash } from './ethereum-service';
import { IPFS_GATEWAY } from '../environment-variables';
import { callOnce } from '../decorators/call-once';
import CID from 'cids';
import axios from 'axios';

export interface IIpfsClient {
  pinHash(hash: Hash, name?: string): Promise<void>;
  addAndPinData(data: string, name?: string): Promise<Hash>;
  getPinnedObjectsHashes(): Promise<Hash[]>;
}

export type IIpfsService = IpfsService;
export const IIpfsService = DI.createInterface<IIpfsService>('IpfsService');

export class IpfsService {
  public static register(container: IContainer): void {
    container.register(Registration.singleton(IIpfsService, IpfsService));
  }
  /**
   * must be initialize externally prior to using the service
   */
  private ipfs = {} as IIpfsClient;

  constructor(@ILogger private readonly logger: ILogger) {}

  @callOnce('IpfsService')
  public initialize(ipfs: IIpfsClient): void {
    this.ipfs = ipfs;
  }

  /**
   * fetches JSON data given hash, converts to an object
   * @param hash
   * @param protocol -- ipfs or ipns
   * @returns
   */
  public async getObjectFromHash<T>(hash: Hash, protocol = 'ipfs'): Promise<T | undefined> {
    let url = 'n/a';
    try {
      url = this.getIpfsUrl(hash, protocol);
      const response = await axios.get(url);

      if (response.status !== 200) {
        this.logger.fatal(`An error occurred getting the hash ${hash}: ${response.statusText}`);
        return;
      }

      return typeof response.data === 'string' ? (JSON.parse(response.data) as T) : (response.data as T);
    } catch (ex) {
      this.logger.error(`Error fetching from ${url}: ${(ex as { message: string }).message}`);
    }
  }

  /**
   * saves and pin the given data
   * @param str
   * @returns the resulting hash
   */
  public async saveString(str: string, name?: string): Promise<Hash> {
    return this.ipfs.addAndPinData(str, name);
  }

  /**
   * url to use to request content from IPFS
   * @param hash
   * @returns
   */
  public getIpfsUrl(hash: string, protocol = 'ipfs'): string {
    const format = IPFS_GATEWAY;
    const encodedHash = protocol === 'ipfs' ? new CID(hash).toV1().toBaseEncodedString('base32') : hash;
    return format.replace('${hash}', encodedHash).replace('${protocol}', protocol);
  }

  public async getPinnedObjectsHashes(): Promise<Hash[]> {
    return this.ipfs.getPinnedObjectsHashes();
  }
}
