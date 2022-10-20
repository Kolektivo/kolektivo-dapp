import { IAccountStore } from 'stores/account-store';
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadgeType } from 'models/badge-type';
import { DI, IContainer, ILogger, Registration } from 'aurelia';
import { IBlockChainStore } from 'stores/block-chain-store';
import { IConfiguration } from 'configurations/configuration';
import { IContractService } from './contract/contract-service';
import { IEthereumService } from './ethereum-service';
import { getContractAbi } from './contract/contracts';
import LitJsSdk from 'lit-js-sdk';
export type IEncryptionService = EncryptionService;
export const IEncryptionService = DI.createInterface<IEncryptionService>('EncryptionService');

type EncryptionResult = { encryptedString: string; symmetricKey: string };

export class EncryptionService {
  private authSig?: string;
  private encryptedSymmetricKey?: string;
  private client: LitJsSdk.LitNodeClient = new LitJsSdk.LitNodeClient();
  public badgerContractAddress: string = getContractAbi('Governance').main.contracts.monetaryBadger.address;

  public static register(container: IContainer) {
    Registration.singleton(IEncryptionService, EncryptionService).register(container);
  }

  constructor(
    @IEthereumService private readonly ethereumService: IEthereumService,
    @IContractService private readonly contractService: IContractService,
    @ILogger private readonly logger: ILogger,
    @IConfiguration private readonly config: IConfiguration,
    @IBlockChainStore private readonly blockChainStore: IBlockChainStore,
    @IAccountStore private readonly accountStore: IAccountStore,
  ) {
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

  public async encrypt(message: string): Promise<EncryptionResult | undefined> {
    const params = {
      web3: this.blockChainStore.walletProvider,
      account: this.accountStore.walletAddress?.toLowerCase(),
      chainId: this.config.chainId,
    };

    this.authSig = await LitJsSdk.signAndSaveAuthMessage(params);
    const { encryptedString, symmetricKey } = (await LitJsSdk.encryptString(message)) as EncryptionResult;
    this.encryptedSymmetricKey = LitJsSdk.uint8arrayToString(
      await this.client.saveEncryptionKey({
        accessControlConditions: this.getAccessControlConditions(this.badgerContractAddress),
        symmetricKey,
        authSig: this.authSig,
        chain: this.chain,
      }),
      'base16',
    ) as string;

    return { encryptedString, symmetricKey };
  }

  public async decryptAs<T = string>(encryptedString: string): Promise<T | string> {
    const symmetricKey = await this.client.getEncryptionKey({
      accessControlConditions: this.getAccessControlConditions(this.badgerContractAddress),
      toDecrypt: this.encryptedSymmetricKey,
      chain: this.chain,
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
