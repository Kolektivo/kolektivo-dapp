import { BindingMode, CustomElement, ICustomElementViewModel, bindable } from 'aurelia';

export class KFormField implements ICustomElementViewModel {
  @bindable label = '';
  @bindable max = '';
  @bindable helperText = '';
  @bindable({ mode: BindingMode.twoWay }) value = '';

  private currentCharLength = 0;
  constructor() {
    // you can inject the element or any DI in the constructor
  }
  get maxText(): string {
    return `${this.value?.length ?? 0}/${this.max}`;
  }
}
(CustomElement.getDefinition(KFormField) as { capture: boolean }).capture = true;
