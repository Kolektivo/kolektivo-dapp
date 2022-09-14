import './card-nav.scss';
import { BindingMode, ICustomElementViewModel, bindable, customElement } from 'aurelia';
import template from './card-nav.html';

@customElement({ name: 'card-nav', template })
export class CardNav implements ICustomElementViewModel {
  @bindable routes: RouteLink[] = [];

  @bindable({ mode: BindingMode.toView }) active?: string;

  bound() {
    this.setActive();
  }

  setActive() {
    this.active = this.routes.find((y) => y.isActive)?.path;
  }

  handleClick(route: RouteLink) {
    this.routes.forEach((x) => (x.isActive = x === route));
    this.setActive();
  }
}
