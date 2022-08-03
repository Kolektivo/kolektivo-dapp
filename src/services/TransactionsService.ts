import { DI, IContainer, IEventAggregator, Registration } from 'aurelia';
import { Hash, IEthereumService } from './EthereumService';
import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers';

export type ITransactionsService = TransactionsService;
export const ITransactionsService = DI.createInterface<ITransactionsService>('TransactionsService');

export default class TransactionsService {
  private static blocksToConfirm = 1;

  public static register(container: IContainer) {
    Registration.singleton(ITransactionsService, TransactionsService).register(container);
  }

  constructor(@IEventAggregator private eventAggregator: IEventAggregator, @IEthereumService private ethereumService: IEthereumService) {}

  public async send(methodCall: () => Promise<TransactionResponse>): Promise<TransactionReceipt | null> {
    let receipt: TransactionReceipt;
    try {
      this.eventAggregator.publish('transaction.sending');
      const response = await methodCall();
      this.eventAggregator.publish('transaction.sent', response);
      receipt = await response.wait(1);
      this.eventAggregator.publish('transaction.mined', { message: 'Transaction was mined', receipt });
      receipt = await response.wait(TransactionsService.blocksToConfirm);
      this.eventAggregator.publish('transaction.confirmed', { message: 'Transaction was confirmed', receipt });
      return receipt;
    } catch (ex) {
      this.eventAggregator.publish('transaction.failed', ex);
      return null;
    }
  }

  public getEtherscanLink(txHash: Hash): string {
    return this.ethereumService.getEtherscanLink(txHash, true);
  }
}

export { TransactionResponse } from '@ethersproject/providers';
export { TransactionReceipt } from '@ethersproject/providers';
