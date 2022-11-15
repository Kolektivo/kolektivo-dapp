import { bindable, customElement, ICustomElementViewModel } from 'aurelia';

import template from './user-address.html';

import './user-address.scss';

import { ifExistsThenTrue } from 'design-system/common';

@customElement({ name: 'user-address', template })
export class UserAddress implements ICustomElementViewModel {
  @bindable address?: string;
  @bindable({ set: ifExistsThenTrue }) isTransaction?: boolean;
}
