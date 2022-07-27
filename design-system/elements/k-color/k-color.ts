import { ICustomElementViewModel, bindable } from 'aurelia';

export class KColor implements ICustomElementViewModel {
  @bindable var: string;
  copyCode(): void {
    void navigator.clipboard.writeText(`var(--${this.var})`);
  }
}
