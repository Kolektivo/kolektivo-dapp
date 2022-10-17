/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadgeType } from 'models/badge-type';
import { DI, IContainer, ILogger, Registration } from 'aurelia';
import { IContractService } from './contract/contract-service';
import { IEthereumService } from './ethereum-service';
import { getContract } from './contract/contracts';
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

type EncryptionResult = { encryptedString: string; symmetricKey: string };

export class EncryptionService {
  private authSig?: string;
  private encryptedSymmetricKey?: string;

  public badgerContractAddress: string = getContract('Governance').main.contracts.monetaryBadger.address;

  constructor(
    @IEthereumService private readonly ethereumService: IEthereumService,
    @IContractService private readonly contractService: IContractService,
    @ILogger private readonly logger: ILogger,
  ) {
    this.logger.scopeTo('EncryptionService');
  }

  public static register(container: IContainer) {
    Registration.singleton(IEncryptionService, EncryptionService).register(container);
  }

  public async encrypt(message: string): Promise<EncryptionResult | undefined> {
    const params = {
      web3: this.ethereumService.walletProvider,
      account: this.ethereumService.defaultAccountAddress?.toLowerCase(),
      chainId: this.ethereumService.targetedChainId,
    };

    this.authSig = await LitJsSdk.signAndSaveAuthMessage(params);
    const { encryptedString, symmetricKey } = (await LitJsSdk.encryptString(message)) as EncryptionResult;
    this.encryptedSymmetricKey = LitJsSdk.uint8arrayToString(
      await client.saveEncryptionKey({
        accessControlConditions: accessControlConditions(this.badgerContractAddress),
        symmetricKey,
        authSig: this.authSig,
        chain,
      }),
      'base16',
    ) as string;

    return { encryptedString, symmetricKey };
  }

  public async decryptAs<T = string>(encryptedString: string): Promise<T | string> {
    const symmetricKey = await client.getEncryptionKey({
      accessControlConditions: accessControlConditions(this.badgerContractAddress),
      toDecrypt: this.encryptedSymmetricKey,
      chain,
      authSig: this.authSig,
    });
    const decryptedString: string = await LitJsSdk.decryptString(encryptedString, symmetricKey);
    try {
      return JSON.parse(decryptedString) as T;
    } catch (e) {
      this.logger.info('Failed to parse data from LIT');
    }

    return decryptedString;
  }
}
