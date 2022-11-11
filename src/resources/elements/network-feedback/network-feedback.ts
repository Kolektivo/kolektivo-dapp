import { containerless, customElement, ICustomElementViewModel } from 'aurelia';

import { IStore } from './../../../stores/store';
import template from './network-feedback.html';

import './network-feedback.scss';

import { IConfiguration } from 'configurations/configuration';

@containerless
@customElement({ template, name: 'network-feedback' })
export class NetworkFeedback implements ICustomElementViewModel {
  constructor(@IStore private readonly store: IStore, @IConfiguration private readonly configuration: IConfiguration) {}

  get networkName(): string | null {
    return this.store.blockChainStore.targetedNetwork;
  }

  get isTestnet(): boolean {
    return this.configuration.isDevelopment;
  }
}
