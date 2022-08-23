import './network-feedback.scss';
import { ICustomElementViewModel, containerless, customElement } from 'aurelia';
import { IEthereumService, Networks } from '../../../services';
import template from './network-feedback.html';

@containerless
@customElement({ template, name: 'network-feedback' })
export class NetworkFeedback implements ICustomElementViewModel {
  constructor(@IEthereumService private readonly ethereumService: IEthereumService) {}

  get networkName(): string {
    return this.ethereumService.targetedNetwork ?? '';
  }

  get isTestnet(): boolean {
    return this.networkName !== Networks.Celo;
  }
}
