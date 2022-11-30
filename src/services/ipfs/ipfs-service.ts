import { DI, IContainer, Registration } from 'aurelia';

import { IIpfsApi } from './ipfs-interface';

import type { IPFSPath } from 'ipfs-core-types/src/utils';
import type { CID } from 'ipfs-http-client';

export type IIpfsService = IpfsService;
export const IIpfsService = DI.createInterface<IIpfsService>();

export class IpfsService {
  public static register(container: IContainer): void {
    container.register(Registration.singleton(IIpfsService, IpfsService));
  }

  constructor(@IIpfsApi private readonly client: IIpfsApi) {}

  public async all(source: AsyncIterable<Uint8Array>) {
    const arr = [];

    for await (const entry of source) {
      arr.push(entry);
    }

    return arr;
  }

  public save<T extends string | Record<string, unknown>>(value: T, pin = true): Promise<CID> {
    return typeof value === 'string'
      ? this.client
          .add(
            { content: value },
            {
              pin,
            },
          )
          .then((y) => y.cid)
      : this.client.dag.put(value, {
          pin,
        });
  }

  public async get(cid: IPFSPath, dag = false, path?: string): Promise<string | undefined> {
    const parsedCid = (await import('multiformats/cid')).CID.asCID(cid) as unknown as CID | null;
    if (!parsedCid) return;
    if (!dag) {
      const data = this.client.cat(cid);
      const allBits = (await import('uint8arrays/concat')).concat(await this.all(data));
      return (await import('uint8arrays/to-string')).toString(allBits);
    }

    return JSON.stringify((await this.client.dag.get(parsedCid, { path: path })).value);
  }
}
