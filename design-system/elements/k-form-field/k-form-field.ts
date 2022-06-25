import { BindingMode, CustomElement, ICustomElementViewModel, bindable } from 'aurelia';
import { IfExistsThenTrue } from 'utils';
import { ValidationResult } from '@aurelia/validation';

export class KFormField implements ICustomElementViewModel {
  @bindable label = '';
  @bindable max = '';
  @bindable helperText = '';
  @bindable({ set: IfExistsThenTrue }) isError = false;
  @bindable errors: ValidationResult[] = [];
  @bindable({ mode: BindingMode.twoWay }) value = '';
  @bindable name = '';
  @bindable object;

  get maxText(): string {
    return `${this.value?.length ?? 0}/${this.max}`;
  }
}
(CustomElement.getDefinition(KFormField) as { capture: boolean }).capture = true;
