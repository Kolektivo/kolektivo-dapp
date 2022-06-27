import { ICustomAttributeViewModel, customAttribute } from 'aurelia';

@customAttribute({ name: 'underline' })
export class Underline implements ICustomAttributeViewModel {
  constructor(private readonly element: HTMLElement) {
    this.element.style.textDecoration = 'underline';
  }
}
