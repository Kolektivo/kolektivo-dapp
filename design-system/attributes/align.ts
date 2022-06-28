import { ICustomAttributeViewModel, bindable, customAttribute } from 'aurelia';

@customAttribute({ name: 'align' })
export class Align implements ICustomAttributeViewModel {
  @bindable()
  public value: string; // replace with type

  constructor(private readonly element: HTMLElement) {}

  public afterBind(): void {
    /* Place Code In Here */
    // this.element.classList.add(value);
    this.element.style.textAlign = this.value;
  }

  /* Example of change detection */
  public valueChanged(): void {
    this.afterBind();
  }
}
