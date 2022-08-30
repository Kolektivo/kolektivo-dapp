import './user-address.scss';
import { ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { ifExistsThenTrue } from 'design-system/common';
import template from './user-address.html';

@customElement({ name: 'user-address', template })
export class UserAddress implements ICustomElementViewModel {
  @bindable address?: string;
  @bindable({ set: ifExistsThenTrue }) isTransaction?: boolean;
}
