import { IContainer, ICustomAttributeViewModel, bindable, customAttribute } from 'aurelia';
import { ICustomElementController } from '@aurelia/runtime-html';
import { KTooltip } from '../../design-system/elements';
import { createCustomElement, destroyCustomElement } from '../../design-system/aurelia-helpers';

@customAttribute({ name: 'tooltip' })
export class Tooltip implements ICustomAttributeViewModel {
  @bindable value: string;
  controller?: ICustomElementController;

  constructor(private readonly element: HTMLElement, @IContainer private readonly container: IContainer) {
    this.element.onmouseover = this.onHover;
    this.element.onmouseout = this.onHoverOut;
  }

  onHover = () => {
    if (this.controller) return;
    const tooltip = document.createElement('k-tooltip');
    this.element.insertAdjacentElement('beforebegin', tooltip);
    const { controller, instance } = createCustomElement(KTooltip, this.container, tooltip, { message: this.value });

    instance.top = this.element.offsetTop + -10;
    // instance.left = this.element.offsetLeft;
    instance.left = this.element.offsetLeft + this.element.offsetWidth / 2;

    this.controller = controller;
  };

  onHoverOut = async () => {
    await destroyCustomElement(this.controller);
    this.controller = void 0;
  };
}
