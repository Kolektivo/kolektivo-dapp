import { customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import template from './pending-veto.html';

import './pending-veto.scss';

@customElement({ name: 'pending-veto', template })
export class PendingVeto implements ICustomElementViewModel {}
