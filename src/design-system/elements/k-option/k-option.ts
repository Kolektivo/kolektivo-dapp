import { CustomElement, ICustomElementViewModel, INode, bindable, customElement, shadowCSS } from 'aurelia';
import { KSelect } from './../k-select/k-select';
import { captureFilter } from './../../common';

import { IPlatform, watch } from '@aurelia/runtime-html';
import css from './k-option.scss';
import template from './k-option.html';

@customElement({
  name: 'k-option',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KOption implements ICustomElementViewModel {
  constructor(@IPlatform private readonly platform: IPlatform, @INode private readonly element: HTMLElement) {
    if (!this.text) this.text = this.element.innerText;
  }
  @bindable value?: string;
  @bindable text?: string;
  vm?: KSelect;
  attached() {
    if (!this.element.parentElement?.shadowRoot) return;
    this.vm = CustomElement.for(this.element.parentElement.shadowRoot).viewModel as KSelect;
    if (!this.value || !this.text) return;
    this.vm.options.push({ value: this.value, text: this.text });
    if (this.vm.value == this.value) {
      this.vm.text = this.text;
    }
  }

  @watch('vm.menuOpen')
  menuOpened(newVal: boolean): void {
    if (newVal && this.vm?.value == this.value) {
      this.scrollIntoView();
    }
  }

  @watch('vm.value')
  valueChanged(): void {
    if (this.vm?.value == this.value) {
      this.scrollIntoView();
    }
  }

  private scrollIntoView(): void {
    this.platform.taskQueue.queueTask(() => {
      this.element.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    });
  }

  select(e: MouseEvent) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (!this.vm) return;
    this.vm.value = this.value;
    this.vm.text = this.text;
    this.vm.menuOpen = false;
  }
}
