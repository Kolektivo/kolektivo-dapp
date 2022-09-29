import { AddResult } from 'ipfs-core-types/src/root';
import { CID } from 'ipfs-http-client';
import { Constructable, DI, IContainer, Registration } from 'aurelia';
import { GetResult } from 'ipfs-core-types/src/dag';
import { IIpfsApi } from './ipfs-interface';
import { IPFSPath } from 'ipfs-core-types/src/utils';

export type IIpfsService = IpfsService;
export const IIpfsService = DI.createInterface<IIpfsService>();

export class IpfsService {
  public static register(container: IContainer): void {
    container.register(Registration.singleton(IIpfsService, IpfsService));
  }

  constructor(@IIpfsApi private readonly client: IIpfsApi) {}

  public save<T extends string | Constructable>(value: T, pin = true): T extends string ? Promise<AddResult> : Promise<CID> {
    return (
      typeof value === 'string'
        ? this.client.add(
            { content: value },
            {
              pin,
            },
          )
        : this.client.dag.put(value, {
            pin,
          })
    ) as T extends string ? Promise<AddResult> : Promise<CID>;
  }

  public async get(cid: IPFSPath): Promise<GetResult | undefined> {
    const parsedCid = CID.asCID(cid);
    return parsedCid ? this.client.dag.get(parsedCid) : undefined;
  }
}
