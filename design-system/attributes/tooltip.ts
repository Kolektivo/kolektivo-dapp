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
    const { controller } = createCustomElement(KTooltip, this.container, this.element, { message: this.value });
    this.controller = controller;
  };

  onHoverOut = async () => {
    await destroyCustomElement(this.controller);
    this.controller = void 0;
  };
}
