import './pending-veto.scss';
import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import template from './pending-veto.html';

@customElement({ name: 'pending-veto', template })
export class PendingVeto implements ICustomElementViewModel {}
