import { BadgeType } from 'models/badge-type';
import { DI, IContainer, ILogger, Registration } from 'aurelia';
import { IEncryptionClient } from 'encryption-client';
import { IEthereumService } from './ethereum-service';
import { getContractAbi } from './contract/contracts';

export type IEncryptionService = EncryptionService;
export const IEncryptionService = DI.createInterface<IEncryptionService>('EncryptionService');

type EncryptionResult = { encryptedString: string; symmetricKey: string };

export class EncryptionService {
  public static register(container: IContainer) {
    Registration.singleton(IEncryptionService, EncryptionService).register(container);
  }

  private authSig?: string;
  private encryptedSymmetricKey?: string;
  public badgerContractAddress: string = getContractAbi('Governance').main.contracts.monetaryBadger.address;

  constructor(
    @ILogger private readonly logger: ILogger,
    @IEncryptionClient private readonly encryptionClient: IEncryptionClient,
    @IEthereumService private readonly ethereumService: IEthereumService,
  ) {
    this.logger.scopeTo('EncryptionService');
    void this.connect();
  }

  private get chain(): string {
    return this.ethereumService.targetedNetwork?.toLowerCase() ?? '';
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
    return this.encryptionClient.connect();
  }

  public async encrypt(message: string): Promise<EncryptionResult | undefined> {
    if (!this.ethereumService.walletProvider || !this.ethereumService.defaultAccountAddress || !this.ethereumService.targetedChainId) return;
    const params = {
      web3: this.ethereumService.walletProvider,
      account: this.ethereumService.defaultAccountAddress.toLowerCase(),
      chainId: this.ethereumService.targetedChainId,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.authSig = await this.encryptionClient.getAuthSig(params);
    const { encryptedString, symmetricKey } = await this.encryptionClient.encryptString(message);
    this.encryptedSymmetricKey = this.encryptionClient.uint8arrayToString(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await this.encryptionClient.saveEncryptionKey({
        accessControlConditions: this.getAccessControlConditions(this.badgerContractAddress),
        symmetricKey,
        authSig: this.authSig,
        chain: this.chain,
      }),
      'base16',
    );

    return { encryptedString, symmetricKey };
  }

  public async decryptAs<T = string>(encryptedString: string): Promise<T | string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const symmetricKey = await this.encryptionClient.getEncryptionKey({
      accessControlConditions: this.getAccessControlConditions(this.badgerContractAddress),
      toDecrypt: this.encryptedSymmetricKey,
      chain: this.chain,
      authSig: this.authSig,
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const decryptedString: string = await this.encryptionClient.decryptString(encryptedString, symmetricKey);
    try {
      return JSON.parse(decryptedString) as T;
    } catch (e) {
      this.logger.info('Failed to parse data from LIT');
    }

    return decryptedString;
  }
}
