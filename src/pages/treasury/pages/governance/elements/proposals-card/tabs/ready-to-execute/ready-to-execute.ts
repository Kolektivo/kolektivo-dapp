import { customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import template from './ready-to-execute.html';

import './ready-to-execute.scss';

@customElement({ name: 'ready-to-execute', template })
export class ReadyToExecute implements ICustomElementViewModel {}
