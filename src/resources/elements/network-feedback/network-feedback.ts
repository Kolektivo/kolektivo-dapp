import './network-feedback.scss';
import { AllowedNetworks } from 'models/allowed-network';
import { ICustomElementViewModel, containerless, customElement } from 'aurelia';
import { IStore } from './../../../stores/store';
import template from './network-feedback.html';

@containerless
@customElement({ template, name: 'network-feedback' })
export class NetworkFeedback implements ICustomElementViewModel {
  constructor(@IStore private readonly store: IStore) {}

  get networkName(): AllowedNetworks {
    return this.store.blockChainStore.targetedNetwork;
  }

  get isTestnet(): boolean {
    return this.networkName !== AllowedNetworks.Celo;
  }
}
