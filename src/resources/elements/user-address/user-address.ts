import './user-address.scss';
import { ICustomElementViewModel, bindable, customElement } from 'aurelia';
import template from './user-address.html';

@customElement({ name: 'user-address', template })
export class UserAddress implements ICustomElementViewModel {
  @bindable address?: string;
}
