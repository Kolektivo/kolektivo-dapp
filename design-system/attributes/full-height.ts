import { ICustomAttributeViewModel, customAttribute } from 'aurelia';

@customAttribute({ name: 'full-height' })
export class FullHeight implements ICustomAttributeViewModel {
  constructor(private readonly element: HTMLElement) {
    this.element.style.height = '100%';
  }
}
