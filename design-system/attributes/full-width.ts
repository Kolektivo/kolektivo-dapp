import { ICustomAttributeViewModel, customAttribute } from 'aurelia';

@customAttribute({ name: 'full-width' })
export class FullWidth implements ICustomAttributeViewModel {
  constructor(private readonly element: HTMLElement) {
    this.element.style.width = '100%';
  }
}
