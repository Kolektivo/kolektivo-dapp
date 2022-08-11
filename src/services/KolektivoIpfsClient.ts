import { DI, IContainer, Registration } from 'aurelia';
import { IIpfsClient } from './IpfsService';

export type IKolektivoIpfsClient = KolektivoIpfsClient;
export const IKolektivoIpfsClient = DI.createInterface<IKolektivoIpfsClient>('KolektivoIpfsClient');

export class KolektivoIpfsClient implements IIpfsClient {
  public static register(container: IContainer): void {
    container.register(Registration.singleton(IKolektivoIpfsClient, KolektivoIpfsClient));
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pinHash(hash: string, name?: string | undefined): Promise<void> {
    // 'https://ipfs.rpcs.dev:4001'
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addAndPinData(data: string, name?: string | undefined): Promise<string> {
    // 'https://ipfs.rpcs.dev:4001'
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPinnedObjectsHashes(): Promise<string[]> {
    // 'https://ipfs.rpcs.dev:4001'
    throw new Error('Method not implemented.');
  }
  // private httpRequestConfig;
  // constructor() {
  // this.httpRequestConfig = {
  //   headers: {
  //     pinata_api_key: EthereumService.targetedNetwork === 'mainnet' ? process.env.PINATA_API_KEY : process.env.PINATA_API_KEY_TEST,
  //     pinata_secret_api_key:
  //       EthereumService.targetedNetwork === 'mainnet' ? process.env.PINATA_SECRET_API_KEY : process.env.PINATA_SECRET_API_KEY_TEST,
  //   },
  // };
  //}
  // public async addAndPinData(data: string, name?: string): Promise<Hash> {
  //   const body = {
  //     pinataContent: data,
  //   };
  //   if (name) {
  //     body.pinataMetadata = JSON.stringify({ name });
  //   }
  //   try {
  //     const response = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', body, this.httpRequestConfig);
  //     if (response.status !== 200) {
  //       throw Error(`An error occurred adding these data to ipfs: ${response.statusText}`);
  //     } else {
  //       return response.data.IpfsHash;
  //     }
  //   } catch (ex) {
  //     throw new Error(ex);
  //   }
  // }
  // public async pinHash(hash: Hash, name?: string): Promise<void> {
  //   const body = {
  //     hashToPin: hash,
  //   };
  //   if (name) {
  //     body.pinataMetadata = JSON.stringify({ name });
  //   }
  //   try {
  //     const response = await axios.post('https://api.pinata.cloud/pinning/pinByHash', body, this.httpRequestConfig);
  //     if (response.status !== 200) {
  //       throw Error(`An error occurred pinning the file ${hash}: ${response.statusText}`);
  //     }
  //   } catch (ex) {
  //     throw new Error(ex);
  //   }
  // }
  // public async getPinnedObjectsHashes(): Promise<Hash[]> {
  //   try {
  //     const response = await axios.get('https://api.pinata.cloud/data/pinList', {
  //       headers: {
  //         pinata_api_key: process.env.PINATA_API_KEY_TEST,
  //         pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY_TEST,
  //       },
  //     });
  //     if (response.status !== 200) {
  //       throw Error('An error occurred getting the pinned jobs');
  //     } else {
  //       if (response.data.length === 0) return [];
  //       const pinnedObjects = response.data.rows.filter((pin: any) => pin.date_pinned !== null && pin.date_unpinned === null);
  //       return pinnedObjects.map((pin: any) => pin.ipfs_pin_hash);
  //     }
  //   } catch (ex) {
  //     this.consoleLogService.logMessage(ex.message, 'warning');
  //     return null;
  //   }
  // }
}
