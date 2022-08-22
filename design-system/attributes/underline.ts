import { ICustomAttributeViewModel, INode, customAttribute } from 'aurelia';

@customAttribute({ name: 'underline' })
export class Underline implements ICustomAttributeViewModel {
  constructor(@INode private readonly element: HTMLElement) {
    this.element.style.textDecoration = 'underline';
  }
}
