import { ICustomElementViewModel, bindable, capture } from 'aurelia';
import { ifExistsThenTrue } from './../../common';

@capture()
export class KInput implements ICustomElementViewModel {
  @bindable type = 'text';
  @bindable name = '';
  @bindable({ set: ifExistsThenTrue }) multiline = false;
  @bindable({ set: ifExistsThenTrue }) error = false;
  @bindable rows = 4;
  start?: HTMLSlotElement;
  input?: HTMLInputElement;
  startWidth?: number;

  attached(): void | Promise<void> {
    setTimeout(() => (this.startWidth = this.start?.assignedElements()[0]?.clientWidth ?? 0 + 16), 1);
  }
  focusInput(): void {
    this.input?.focus();
  }
  focused(): void {
    this.input?.select();
  }
}
