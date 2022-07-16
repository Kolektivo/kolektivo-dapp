import { IContainer, ICustomAttributeViewModel, bindable, customAttribute } from 'aurelia';
import { ICustomElementController } from '@aurelia/runtime-html';
import { KTooltip } from '../../design-system/elements';
import { Position } from './../types';
import { createCustomElement, destroyCustomElement } from '../../design-system/aurelia-helpers';

@customAttribute({ name: 'tooltip' })
export class Tooltip implements ICustomAttributeViewModel {
  @bindable value: string;
  @bindable position: Position;
  controller?: ICustomElementController;
  host: HTMLElement;

  constructor(private readonly element: HTMLElement, @IContainer private readonly container: IContainer) {
    this.element.onmouseover = this.onHover;
    this.element.onmouseout = this.onHoverOut;
  }

  onHover = (): void => {
    if (this.controller) return;
    this.host = document.createElement('k-tooltip');
    this.element.insertAdjacentElement('beforebegin', this.host);
    const { controller } = createCustomElement(KTooltip, this.container, this.host, { message: this.value, host: this.element, position: this.position });

    this.controller = controller;
  };

  onHoverOut = async (): Promise<void> => {
    await destroyCustomElement(this.controller);
    this.host.remove();
    this.controller = void 0;
  };
}
