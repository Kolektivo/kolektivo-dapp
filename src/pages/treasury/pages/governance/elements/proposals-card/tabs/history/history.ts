import { customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import { ProposalStatus } from '../../../../../../../../models/proposal';

import template from './history.html';

import './history.scss';

@customElement({ name: 'history', template })
export class History implements ICustomElementViewModel {
  proposalStatus = ProposalStatus;
}
