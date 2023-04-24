import { I18N } from '@aurelia/i18n';
import { customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import { Treasury } from '../../../../../../models/generated/monetary/treasury';
import { IContractService, IIpfsService } from '../../../../../../services';
import { IEncryptionService } from '../../../../../../services/encryption-service';
import { IAccountStore } from '../../../../../../stores/account-store';
import { IWalletProvider } from '../../../../../../wallet-provider';

import { IGovernanceStore } from './../../../../../../stores/governance-store';
import template from './submit-proposal-card.html';
import * as tabs from './tabs';

/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import './submit-proposal-card.scss';

@customElement({ name: 'submit-proposal-card', template, dependencies: [tabs] })
export class SubmitProposalCard implements ICustomElementViewModel {
  routes: RouteLink[] = [];
  messageToEncrypt = '';
  encryptedResult?: string;
  decryptedResult?: string;
  error = '';
  isPublic = false;

  constructor(
    @I18N private readonly i18n: I18N,
    @IEncryptionService private readonly encryptionService: IEncryptionService,
    @IGovernanceStore private readonly governanceStore: IGovernanceStore,
    @IIpfsService private readonly ipfsService: IIpfsService,
    @IContractService private readonly contractService: IContractService,
    @IAccountStore private readonly accountStore: IAccountStore,
    @IWalletProvider private readonly walletProvider: IWalletProvider,
  ) {
    this.routes = [
      { name: this.i18n.tr('navigation.treasury.governance.submit-card.bonds-tab.title'), path: 'bonds', isActive: true },
      { name: this.i18n.tr('navigation.treasury.governance.submit-card.bonds-admin-tab.title'), path: 'bond-admin', isActive: false },
      { name: this.i18n.tr('navigation.treasury.governance.submit-card.treasury-tab.title'), path: 'treasury', isActive: false },
      { name: this.i18n.tr('navigation.treasury.governance.submit-card.other-tab.title'), path: 'other', isActive: false },
    ];
  }

  async sendTransaction(): Promise<void> {
    try {
      const data = await this.contractService.callPopulateTransaction(
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        (await this.contractService.getContract('monetary', 'Treasury')) as Treasury,
        'listERC20AsBondable',
        '0x74F9479B29CFb52Db30D76ffdD5F192a73BAD870',
      );

      let ipfsHash: string | undefined;
      if (!this.isPublic && this.walletProvider.provider && this.accountStore.walletAddress) {
        const encryptedData = await this.encryptionService.encrypt(
          JSON.stringify(data),
          this.walletProvider.provider,
          this.accountStore.walletAddress,
          (
            await this.accountStore.getBadgerContract()
          ).address,
        ); //TODO: Figure out what we're supposed to be encrypting here
        if (!encryptedData) return;
        ipfsHash = (await this.ipfsService.save(encryptedData.encryptedString)).toString();
      }
      await this.governanceStore.submitDynamicMethod(this.isPublic, data, ipfsHash);
    } catch (ex) {
      //TODO put an error somewhere
      //alert(JSON.stringify(ex));
    }
  }

  async encrypt() {
    try {
      this.error = '';
      if (this.messageToEncrypt === '') {
        this.error = 'Please enter a message to encrypt';
        return;
      }

      if (!this.walletProvider.provider || !this.accountStore.walletAddress) return;

      this.encryptedResult = (
        await this.encryptionService.encrypt(this.messageToEncrypt, this.walletProvider.provider, this.accountStore.walletAddress, (await this.accountStore.getBadgerContract()).address)
      )?.encryptedString;
    } catch (ex) {
      this.error = JSON.stringify(ex);
    }
  }

  async decrypt() {
    try {
      this.error = '';
      this.decryptedResult = this.encryptedResult && (await this.encryptionService.decryptAs(this.encryptedResult, (await this.accountStore.getBadgerContract()).address));
    } catch (ex) {
      this.error = JSON.stringify(ex);
    }
  }
}
