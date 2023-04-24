import { bindable, customElement, ICustomElementViewModel } from 'aurelia';

import { ifExistsThenTrue } from '../../../design-system/common';

import template from './user-address.html';

import './user-address.scss';

@customElement({ name: 'user-address', template })
export class UserAddress implements ICustomElementViewModel {
  @bindable address?: string;
  @bindable({ set: ifExistsThenTrue }) isTransaction?: boolean;
}
