import './network-feedback.scss';
import { ICustomElementViewModel, containerless, customElement } from 'aurelia';
import { IStore } from './../../../stores/store';
import { Networks } from '../../../services';
import template from './network-feedback.html';

@containerless
@customElement({ template, name: 'network-feedback' })
export class NetworkFeedback implements ICustomElementViewModel {
  constructor(@IStore private readonly store: IStore) {}

  get networkName(): AllowedNetworks | null {
    return this.store.blockChainStore.targetedNetwork;
  }

  get isTestnet(): boolean {
    return this.networkName !== Networks.Celo;
  }
}
