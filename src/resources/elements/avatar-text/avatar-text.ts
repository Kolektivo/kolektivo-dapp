import './avatar-text.scss';
import { ICustomElementViewModel, bindable, customElement } from 'aurelia';
import template from './avatar-text.html';

@customElement({ name: 'avatar-text', template })
export class Token implements ICustomElementViewModel {
  @bindable src?: string;
  @bindable size = 24;
  @bindable icon?: string;
  @bindable name?: string;
  @bindable color?: string;
}
