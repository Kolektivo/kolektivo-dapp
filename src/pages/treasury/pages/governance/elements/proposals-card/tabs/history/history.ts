import { customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import template from './history.html';

import './history.scss';

import { ProposalStatus } from 'models/proposal';

@customElement({ name: 'history', template })
export class History implements ICustomElementViewModel {
  proposalStatus = ProposalStatus;
}
