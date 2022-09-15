import './history.scss';
import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import { ProposalStatus } from 'models/proposal';
import template from './history.html';

@customElement({ name: 'history', template })
export class History implements ICustomElementViewModel {
  proposalStatus = ProposalStatus;
}
