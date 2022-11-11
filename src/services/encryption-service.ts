import { DI, IContainer, ILogger, Registration } from 'aurelia';

import { Web3Provider } from '@ethersproject/providers/lib';
import { IConfiguration } from 'configurations/configuration';
import LitJsSdk from 'lit-js-sdk';
import { BadgeType } from 'models/badge-type';

export type IEncryptionService = EncryptionService;
export const IEncryptionService = DI.createInterface<IEncryptionService>('EncryptionService');

type EncryptionResult = { encryptedString: string; symmetricKey: string };

export class EncryptionService {
  public static register(container: IContainer) {
    Registration.singleton(IEncryptionService, EncryptionService).register(container);
  }

  private authSig?: string;
  private encryptedSymmetricKey?: string;
  private client: LitJsSdk.LitNodeClient = new LitJsSdk.LitNodeClient();

  constructor(@ILogger private readonly logger: ILogger, @IConfiguration private readonly config: IConfiguration) {
    this.logger.scopeTo('EncryptionService');
    void this.connect();
  }

  private get chain() {
    return this.config.chain.toLowerCase();
  }

  private getAccessControlConditions(address: string) {
    return [
      {
        contractAddress: address,
        standardContractType: 'ERC1155',
        chain: this.chain,
        method: 'balanceOfBatch',
        parameters: [':userAddress,:userAddress', `${BadgeType.RESERVE_DELEGATE},${BadgeType.ECOLOGY_DELEGATE_PROPOSER}`],
        returnValueTest: {
          comparator: '>',
          value: '0',
        },
      },
    ];
  }

  private connect(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.client.connect();
  }

  public async encrypt(message: string, provider: Web3Provider, address: string, contractAddress: string): Promise<EncryptionResult | undefined> {
    const params = {
      web3: provider,
      account: address.toLowerCase(),
      chainId: this.config.chainId,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.authSig = await LitJsSdk.signAndSaveAuthMessage(params);
    const { encryptedString, symmetricKey } = (await LitJsSdk.encryptString(message)) as EncryptionResult;
    this.encryptedSymmetricKey = LitJsSdk.uint8arrayToString(
      await this.client.saveEncryptionKey({
        accessControlConditions: this.getAccessControlConditions(contractAddress),
        symmetricKey,
        authSig: this.authSig,
        chain: this.chain,
      }),
      'base16',
    ) as string;

    return { encryptedString, symmetricKey };
  }

  public async decryptAs<T = string>(encryptedString: string, contractAddress: string): Promise<T | string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const symmetricKey = await this.client.getEncryptionKey({
      accessControlConditions: this.getAccessControlConditions(contractAddress),
      toDecrypt: this.encryptedSymmetricKey,
      chain: this.chain,
      authSig: this.authSig,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const decryptedString: string = await LitJsSdk.decryptString(encryptedString, symmetricKey);
    try {
      return JSON.parse(decryptedString) as T;
    } catch (e) {
      this.logger.info('Failed to parse data from LIT');
    }

    return decryptedString;
  }
}
