import { ICustomElementViewModel, bindable, capture } from 'aurelia';
@capture()
export class KSelect implements ICustomElementViewModel {
  @bindable options = [];
  @bindable placeholder?: string;
  changed(): void {
    (document.activeElement as HTMLElement).blur();
  }
}
