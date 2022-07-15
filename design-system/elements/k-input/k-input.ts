import { CustomElement, ICustomElementViewModel, LifecycleFlags, bindable } from 'aurelia';
import { IHydratedController } from '@aurelia/runtime-html';
import { IfExistsThenTrue } from './../../common';

export class KInput implements ICustomElementViewModel {
  @bindable type = 'text';
  @bindable name = '';
  @bindable({ set: IfExistsThenTrue }) multiline = false;
  @bindable({ set: IfExistsThenTrue }) error = false;
  @bindable rows = 4;
  start: HTMLSlotElement;
  input: HTMLInputElement;
  startWidth: number;
  constructor() {
    // you can inject the element or any DI in the constructor
  }
  attached(_initiator: IHydratedController, _flags: LifecycleFlags): void | Promise<void> {
    setTimeout(() => (this.startWidth = this.start.assignedElements()[0]?.clientWidth + 16), 1);
  }
  focusInput() {
    this.input.focus();
  }
  focused() {
    this.input.select();
  }
}

(CustomElement.getDefinition(KInput) as { capture: boolean }).capture = true;
