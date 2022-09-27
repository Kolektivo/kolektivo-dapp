import { IGovernanceStore } from './../../../../../../stores/governance-store';
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import './submit-proposal-card.scss';
import * as tabs from './tabs';
import { I18N } from '@aurelia/i18n';
import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import { IEncryptionService } from 'services/encryption-service';
import { IIpfsService } from 'services';
import { ITreasuryStore } from 'stores';
import { PopulatedTransaction } from 'ethers';
import template from './submit-proposal-card.html';
@customElement({ name: 'submit-proposal-card', template, dependencies: [tabs] })
export class SubmitProposalCard implements ICustomElementViewModel {
  routes: RouteLink[] = [];
  messageToEncrypt = '';
  encryptedResult?: any;
  decryptedResult?: any;
  error = '';
  constructor(
    @I18N private readonly i18n: I18N,
    @IEncryptionService private readonly encryptionService: IEncryptionService,
    @ITreasuryStore private readonly treasuryStore: ITreasuryStore,
    @IGovernanceStore private readonly governanceStore: IGovernanceStore,
    @IIpfsService private readonly ipfsService: IIpfsService,
  ) {
    this.routes = [
      { name: this.i18n.tr('navigation.treasury.governance.submit-card.bonds-tab.title'), path: 'bonds', isActive: true },
      { name: this.i18n.tr('navigation.treasury.governance.submit-card.bonds-admin-tab.title'), path: 'bond-admin', isActive: false },
      { name: this.i18n.tr('navigation.treasury.governance.submit-card.treasury-tab.title'), path: 'treasury', isActive: false },
      { name: this.i18n.tr('navigation.treasury.governance.submit-card.other-tab.title'), path: 'other', isActive: false },
    ];
  }

  async sendTransaction(): Promise<void> {
    const isPublic = true;
    try {
      const data = (await this.treasuryStore.getDynamicMethodData(
        'listERC20AsBondable',
        '0x74F9479B29CFb52Db30D76ffdD5F192a73BAD870',
      )) as PopulatedTransaction;
      console.log('DATA', data);
      let ipfsHash: any;
      if (!isPublic) {
        const encryptedData = await this.encryptionService.encrypt(JSON.stringify(data)); //TODO: Figure out what we're supposed to be encrypting here
        if (!encryptedData) return;
        ipfsHash = await this.ipfsService.saveString(encryptedData);
      }
      const result = await this.governanceStore.submitDynamicMethod(isPublic, data, ipfsHash);
      console.log('Submitted transaction result', result);
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
      this.encryptedResult = await this.encryptionService.encrypt(this.messageToEncrypt);
    } catch (ex) {
      this.error = JSON.stringify(ex);
    }
  }
  async decrypt() {
    try {
      this.error = '';
      this.decryptedResult = await this.encryptionService.decrypt(this.encryptedResult);
    } catch (ex) {
      this.error = JSON.stringify(ex);
    }
  }
}
