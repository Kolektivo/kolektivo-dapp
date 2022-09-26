import { IEthereumService } from './ethereum-service';
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadgeType } from 'models/badge-type';
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DI, IContainer, Registration } from 'aurelia';
import { IContractsService } from 'services';
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
  private authSig: any;
  private encryptedSymmetricKey: any;
  private badgerContractAddress?: string;
  constructor(
    @IEthereumService private readonly ethereumService: IEthereumService,
    @IContractsService private readonly contractsService: IContractsService,
  ) {
    //TODO figure out why this.contractsService.getContractAddress always returns empty
    //this.badgerContractAddress = this.contractsService.getContractAddress(ContractNames.MONETARYBADGER) ?? '';
    this.badgerContractAddress = '0x74F9479B29CFb52Db30D76ffdD5F192a73BAD870';
  }
  public static register(container: IContainer) {
    Registration.singleton(IEncryptionService, EncryptionService).register(container);
  }

  public async encrypt(message: string): Promise<string | undefined> {
    const params = {
      web3: this.ethereumService.walletProvider,
      account: this.ethereumService.defaultAccountAddress?.toLowerCase(),
      chainId: 44787,
    };
    this.authSig = await LitJsSdk.signAndSaveAuthMessage(params);
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(message);
    if (!this.badgerContractAddress) return;
    this.encryptedSymmetricKey = LitJsSdk.uint8arrayToString(
      await client.saveEncryptionKey({
        accessControlConditions: accessControlConditions(this.badgerContractAddress),
        symmetricKey,
        authSig: this.authSig,
        chain,
      }),
      'base16',
    );
    return encryptedString;
  }

  public async decrypt(encryptedString: string) {
    if (!this.badgerContractAddress) return;
    const symmetricKey = await client.getEncryptionKey({
      accessControlConditions: accessControlConditions(this.badgerContractAddress),
      toDecrypt: this.encryptedSymmetricKey,
      chain,
      authSig: this.authSig,
    });
    const decryptedString = await LitJsSdk.decryptString(encryptedString, symmetricKey);
    return decryptedString;
  }
}
