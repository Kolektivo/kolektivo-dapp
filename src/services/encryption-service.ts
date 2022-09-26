/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadgeType } from 'models/badge-type';
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DI, IContainer, Registration } from 'aurelia';
import LitJsSdk from 'lit-js-sdk';
export type IEncryptionService = EncryptionService;
export const IEncryptionService = DI.createInterface<IEncryptionService>('EncryptionService');

const chain = 'rinkeby';
const client = new LitJsSdk.LitNodeClient();
await client.connect();
(window as any).litNodeClient = client;

const accessControlConditions = (address: string, tokenId: number) => {
  return [
    {
      contractAddress: address,
      standardContractType: 'ERC1155',
      chain,
      method: 'balanceOf',
      parameters: [':userAddress, :userAddress', BadgeType.RESERVE_DELEGATE, BadgeType.ECOLOGY_DELEGATE_PROPOSER],
      returnValueTest: {
        comparator: '>',
        value: '0',
      },
    },
  ];
};

export class EncryptionService {
  public static register(container: IContainer) {
    Registration.singleton(IEncryptionService, EncryptionService).register(container);
  }

  public async encrypt(message: string): Promise<{ encryptedString: any; encryptedSymmetricKey: any }> {
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
    // debugger;
    // const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(message);

    // const encryptedSymmetricKey = await (window as any).litNodeClient.saveEncryptionKey({
    //   accessControlConditions,
    //   symmetricKey,
    //   authSig,
    //   chain,
    // });
    // console.log('encryptedSymmetricKey', encryptedSymmetricKey);
    // return {
    //   encryptedString, //what we upload to IPFS
    //   encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, 'base16'), //not sure if we need this or not
    // };
  }
  public decrypt() {}
}
