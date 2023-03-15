import { DI, IContainer, ILogger, Registration } from 'aurelia';

import { IConfiguration } from '../configurations/configuration';

import { EncryptionClient, IEncryptionClient } from './../encryption-client';

import type { Web3Provider } from '@ethersproject/providers';

export type IEncryptionService = EncryptionService;
export const IEncryptionService = DI.createInterface<IEncryptionService>('EncryptionService');

type EncryptionResult = { encryptedString: string; symmetricKey: string };

export class EncryptionService {
  private client?: EncryptionClient;
  public static register(container: IContainer) {
    Registration.singleton(IEncryptionService, EncryptionService).register(container);
  }

  private authSig?: string;
  private encryptedSymmetricKey?: string;

  constructor(@ILogger private readonly logger: ILogger, @IContainer private readonly container: IContainer, @IConfiguration private readonly config: IConfiguration) {
    this.logger.scopeTo('EncryptionService');
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

  private async connect(): Promise<void> {
    if (this.client) return;
    const client = await this.container.get(IEncryptionClient);
    this.client = client;
    return await this.client.connect();
  }

  public async encrypt(message: string, provider: Web3Provider, address: string, contractAddress: string): Promise<EncryptionResult | undefined> {
    await this.connect();
    if (!this.client) return;

    const params = {
      web3: provider,
      account: address.toLowerCase(),
      chainId: this.config.chainId,
      expiration: new Date(Date.now() + 300000), // 5 minutes
    };

    this.authSig = await this.client.getAuthSig(params);
    const { encryptedString, symmetricKey } = (await this.client.encryptString(message)) as EncryptionResult;
    this.encryptedSymmetricKey = this.client.uint8arrayToString(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await this.client.saveEncryptionKey({
        accessControlConditions: this.getAccessControlConditions(contractAddress),
        symmetricKey,
        authSig: this.authSig,
        chain: this.chain,
      }),
      'base16',
    );

    return { encryptedString, symmetricKey };
  }

  public async decryptAs<T = string>(encryptedString: string, contractAddress: string): Promise<T | string> {
    await this.connect();
    if (!this.client) throw new Error('No encryption client connected');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const symmetricKey = await this.client.getEncryptionKey({
      accessControlConditions: this.getAccessControlConditions(contractAddress),
      toDecrypt: this.encryptedSymmetricKey,
      chain: this.chain,
      authSig: this.authSig,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const decryptedString: string = await this.client.decryptString(encryptedString, symmetricKey);
    try {
      return JSON.parse(decryptedString) as T;
    } catch (e) {
      this.logger.info('Failed to parse data from LIT');
    }

    return decryptedString;
  }
}
