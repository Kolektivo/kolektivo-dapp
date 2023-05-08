import { containerless, customElement, ICustomElementViewModel } from 'aurelia';

import { IConfiguration } from '../../../configurations/configuration';

import { IStore } from './../../../stores/store';
import template from './network-feedback.html';

import './network-feedback.scss';

@containerless
@customElement({ template, name: 'network-feedback' })
export class NetworkFeedback implements ICustomElementViewModel {
  constructor(@IStore private readonly store: IStore, @IConfiguration private readonly configuration: IConfiguration) {}

  readonly networkName = 'TEST';

  get isTestnet(): boolean {
    return this.configuration.isDevelopment;
  }
}
