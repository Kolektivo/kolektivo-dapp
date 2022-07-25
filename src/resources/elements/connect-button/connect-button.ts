import { Address, DisposableCollection, ICeloService } from '../../../services';
import { ICustomElementViewModel, IEventAggregator } from 'aurelia';

export class ConnectButton implements ICustomElementViewModel {
  private accountAddress: Address = null;
  private subscriptions: DisposableCollection = new DisposableCollection();

  constructor(
    @IEventAggregator private readonly eventAggregator: IEventAggregator,
    @ICeloService private readonly celoService: ICeloService,
  ) {
    this.subscriptions.push(
      this.eventAggregator.subscribe('Network.Changed.Account', async (account: Address) => {
        this.accountAddress = account;
      }),
    );
  }

  connectWallet() {
    if (!this.accountAddress) {
      this.celoService.connect();
    }
  }

  disconnectWallet() {
    if (this.accountAddress) {
      this.celoService.disconnect('User requested');
    }
  }
}
