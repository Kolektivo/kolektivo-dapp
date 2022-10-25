import './network-feedback.scss';
import { AllowedNetwork } from 'models/allowed-network';
import { IConfiguration } from 'configurations/configuration';
import { ICustomElementViewModel, containerless, customElement } from 'aurelia';
import { IStore } from './../../../stores/store';
import template from './network-feedback.html';

@containerless
@customElement({ template, name: 'network-feedback' })
export class NetworkFeedback implements ICustomElementViewModel {
  constructor(@IStore private readonly store: IStore, @IConfiguration private readonly configuration: IConfiguration) {}

  get networkName(): AllowedNetwork | null {
    return this.store.blockChainStore.targetedNetwork;
  }

  get isTestnet(): boolean {
    return this.configuration.isDevelopment;
  }
}
