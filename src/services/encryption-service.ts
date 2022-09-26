/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadgeType } from 'models/badge-type';
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DI, IContainer, Registration } from 'aurelia';
import { ethers } from 'ethers';
import LitJsSdk from 'lit-js-sdk';
export type IEncryptionService = EncryptionService;
export const IEncryptionService = DI.createInterface<IEncryptionService>('EncryptionService');
const chain = 'alfajores';
const client = new LitJsSdk.LitNodeClient();
await client.connect();

const accessControlConditions = (address: string) => {
  return [
    {
      contractAddress: address,
      standardContractType: 'ERC1155',
      chain,
      method: 'balanceOfBatch',
      parameters: [':userAddress,:userAddress', `${BadgeType.RESERVE_DELEGATE},${BadgeType.ECOLOGY_DELEGATE_PROPOSER}`],
      returnValueTest: {
        comparator: '>',
        value: '0',
      },
    },
  ];
};

export class EncryptionService {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  authSig: any;
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  encryptedSymmetricKey: any;
  symmetricKey: any;
  public static register(container: IContainer) {
    Registration.singleton(IEncryptionService, EncryptionService).register(container);
  }

  public async encrypt(message: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    // await provider.send('eth_requestAccounts', []);
    const account = (await provider.listAccounts())[0].toLowerCase();
    const signer = provider.getSigner();

    const params = {
      web3: provider,
      account: account,
      chainId: 44787,
    };

    this.authSig = await LitJsSdk.signAndSaveAuthMessage(params);
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(message);
    this.encryptedSymmetricKey = LitJsSdk.uint8arrayToString(
      await client.saveEncryptionKey({
        accessControlConditions: accessControlConditions('0x74F9479B29CFb52Db30D76ffdD5F192a73BAD870'),
        symmetricKey,
        authSig: this.authSig,
        chain,
      }),
      'base16',
    );
    this.symmetricKey = symmetricKey;

    return encryptedString;
  }

  public async decrypt(encryptedString: string) {
    const symmetricKey = await client.getEncryptionKey({
      accessControlConditions: accessControlConditions('0x74F9479B29CFb52Db30D76ffdD5F192a73BAD870'),
      toDecrypt: this.encryptedSymmetricKey,
      chain,
      authSig: this.authSig,
    });
    const decryptedString = await LitJsSdk.decryptString(encryptedString, symmetricKey);
    return decryptedString;
  }
}
