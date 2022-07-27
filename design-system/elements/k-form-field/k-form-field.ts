import { BindingMode, ICustomElementViewModel, bindable, capture } from 'aurelia';
import { ValidationResult } from '@aurelia/validation';
import { ifExistsThenTrue } from '../../common';

@capture()
export class KFormField implements ICustomElementViewModel {
  @bindable label = '';
  @bindable max = '';
  @bindable helperText = '';
  @bindable({ set: ifExistsThenTrue }) error = false;
  @bindable errors: ValidationResult[] = [];
  @bindable({ mode: BindingMode.twoWay }) value?: string = '';
  @bindable name = '';

  slot?: HTMLSlotElement;
  input?: HTMLInputElement;

  get maxText(): string {
    return `${this.value?.length ?? 0}/${this.max}`;
  }

  focusInput(): void {
    this.input?.focus();
    (this.slot?.firstElementChild as HTMLInputElement).focus();
  }
}
