import { BindingMode, CustomElement, ICustomElementViewModel, bindable } from 'aurelia';
import { IfExistsThenTrue } from '../../common';
import { ValidationResult } from '@aurelia/validation';

export class KFormField implements ICustomElementViewModel {
  @bindable label = '';
  @bindable max = '';
  @bindable helperText = '';
  @bindable({ set: IfExistsThenTrue }) error = false;
  @bindable errors: ValidationResult[] = [];
  @bindable({ mode: BindingMode.twoWay }) value = '';
  @bindable name = '';
  @bindable object;
  slot: HTMLSlotElement;
  input: HTMLInputElement;
  get maxText(): string {
    return `${this.value?.length ?? 0}/${this.max}`;
  }
  focusInput() {
    this.input.focus();
    (this.slot.firstElementChild as HTMLInputElement).focus();
  }
}
(CustomElement.getDefinition(KFormField) as { capture: boolean }).capture = true;
