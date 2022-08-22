import './header.scss';
import { IBlockChainStore } from '../../../stores';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IEthereumService } from '../../../services';
import template from './header.html';
@customElement({ name: 'header', template })
export class Header implements ICustomElementViewModel {
  public badgeTarget?: HTMLElement;
  constructor(
    @IBlockChainStore private readonly blockChainStore: IBlockChainStore,
    @IEthereumService private readonly ethereumService: IEthereumService,
  ) {}

  get pendingTransactions(): number {
    return this.blockChainStore.transactions.filter((x) => x.status === 'pending').length;
  }

  connectWallet(): void {
    void this.ethereumService.connect();
  }
}
