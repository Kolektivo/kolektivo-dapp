import './network-feedback.scss';
import { EthereumService, Networks } from '../../../services';
import { ICustomElementViewModel, containerless, customElement } from 'aurelia';
import template from './network-feedback.html';

@containerless
@customElement({ template, name: 'network-feedback' })
export class NetworkFeedback implements ICustomElementViewModel {
  get networkName(): string {
    return EthereumService.targetedNetwork;
  }

  get isTestnet(): boolean {
    return this.networkName !== Networks.Celo;
  }
}
