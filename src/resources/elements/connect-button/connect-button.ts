import { Address, DisposableCollection, IEthereumService } from '../../../services';
import { ICustomElementViewModel, IEventAggregator } from 'aurelia';

export class ConnectButton implements ICustomElementViewModel {
  private accountAddress: Address = null;
  private subscriptions: DisposableCollection = new DisposableCollection();

  constructor(@IEventAggregator private readonly eventAggregator: IEventAggregator, @IEthereumService private readonly ethereumService: IEthereumService) {
    this.subscriptions.push(
      this.eventAggregator.subscribe('Network.Changed.Account', async (account: Address) => {
        this.accountAddress = account;
      })
    );
  }

  connectWallet() {
    if (!this.accountAddress) {
      this.ethereumService.connect();
    }
  }

  disconnectWallet() {
    if (this.accountAddress) {
      this.ethereumService.disconnect({ code: 0, message: 'User requested' });
    }
  }
}
