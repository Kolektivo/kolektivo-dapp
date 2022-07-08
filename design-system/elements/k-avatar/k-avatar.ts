import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';

export class KAvatar implements ICustomElementViewModel {
  @bindable size = 50;
  @bindable color = 'var(--white)';
  constructor() {
    // you can inject the element or any DI in the constructor
  }

  get divStyle(): Partial<CSSStyleDeclaration> {
    return {
      height: this.size + 'px',
      width: this.size + 'px',
      overflow: 'hidden',
      backgroundColor: this.color,
    };
  }
}

(CustomElement.getDefinition(KAvatar) as { capture: boolean }).capture = true;