import { IGovernanceStore } from './../../../../../../stores/governance-store';
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import './submit-proposal-card.scss';
import * as tabs from './tabs';
import { I18N } from '@aurelia/i18n';
import { IContractService, IIpfsService } from 'services';
import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import { IEncryptionService } from 'services/encryption-service';
import { ITreasuryStore } from 'stores';
import { Treasury } from 'models/generated/monetary/treasury';
import template from './submit-proposal-card.html';
@customElement({ name: 'submit-proposal-card', template, dependencies: [tabs] })
export class SubmitProposalCard implements ICustomElementViewModel {
  routes: RouteLink[] = [];
  messageToEncrypt = '';
  encryptedResult?: string;
  decryptedResult?: string;
  error = '';
  constructor(
    @I18N private readonly i18n: I18N,
    @IEncryptionService private readonly encryptionService: IEncryptionService,
    @ITreasuryStore private readonly treasuryStore: ITreasuryStore,
    @IGovernanceStore private readonly governanceStore: IGovernanceStore,
    @IIpfsService private readonly ipfsService: IIpfsService,
    @IContractService private readonly contractService: IContractService,
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
      const data = await this.contractService.callPopulateTransaction(
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        this.contractService.getContract('Monetary', 'Treasury') as Treasury,
        'listERC20AsBondable',
        '0x74F9479B29CFb52Db30D76ffdD5F192a73BAD870',
      );
      let ipfsHash: string | undefined;
      if (!isPublic) {
        const encryptedData = await this.encryptionService.encrypt(JSON.stringify(data)); //TODO: Figure out what we're supposed to be encrypting here
        if (!encryptedData) return;
        ipfsHash = (await this.ipfsService.save(encryptedData.encryptedString)).cid.toString();
      }
      const result = await this.governanceStore.submitDynamicMethod(isPublic, data, ipfsHash);
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
      this.encryptedResult = (await this.encryptionService.encrypt(this.messageToEncrypt))?.encryptedString;
    } catch (ex) {
      this.error = JSON.stringify(ex);
    }
  }
  async decrypt() {
    try {
      this.error = '';
      this.decryptedResult = this.encryptedResult && (await this.encryptionService.decryptAs(this.encryptedResult));
    } catch (ex) {
      this.error = JSON.stringify(ex);
    }
  }
}
