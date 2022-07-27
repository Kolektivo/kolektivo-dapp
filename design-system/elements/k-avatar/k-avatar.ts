import { ICustomElementViewModel, bindable, capture } from 'aurelia';

@capture()
export class KAvatar implements ICustomElementViewModel {
  @bindable size = 50;
  @bindable color = 'var(--white)';

  get divStyle(): Partial<CSSStyleDeclaration> {
    return {
      height: `${this.size}px`,
      width: `${this.size}px`,
      overflow: 'hidden',
      backgroundColor: this.color,
    };
  }
}
