import { ICustomElementViewModel, INode, IPlatform, bindable, customElement, shadowCSS } from 'aurelia';
import { captureFilter, ifExistsThenTrue, numberToPixelsInterceptor } from './../../common';
import css from './k-select.scss';

import template from './k-select.html';

@customElement({
  name: 'k-select',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KSelect implements ICustomElementViewModel {
  constructor(@IPlatform private readonly platform: IPlatform, @INode private readonly element: HTMLElement) {}

  @bindable placeholder?: string;
  @bindable({ set: ifExistsThenTrue }) disabled = false;
  @bindable({ set: ifExistsThenTrue }) isError = false;
  @bindable({ set: numberToPixelsInterceptor }) width?: string; //defined width, otherwise will be auto width based on the selected value
  @bindable size = 10; //how many options should be shown before scroll in the dropdown
  @bindable value? = ''; //Reflects the value of the first selected option. Setting the value property will update the selected state of the first option that matches the value. If no option with a matching value is present, the value will reset to a blank string.
  options: { value: string; text: string }[] = [];
  text? = '';
  menuOpen = false;
  changed(): void {
    (document.activeElement as HTMLElement).blur();
  }

  get selectStyles() {
    return {
      width: this.width,
    };
  }

  get maxMenuHeight(): number | undefined {
    if (this.options.length > this.size) {
      return this.size * 44;
    }
    return undefined;
  }

  attached(): void {
    this.element.addEventListener('keydown', this.disableWindowEvents);
    this.element.addEventListener('keyup', this.handleKeys);
    this.element.addEventListener('blur', this.handleBlur);
  }
  private handleBlur = (e: FocusEvent): void => {
    if (this.menuOpen && e.relatedTarget !== null) {
      this.menuOpen = false;
    }
  };
  private handleKeys = (e: KeyboardEvent): void => {
    if (e.code === 'Escape' && this.menuOpen) {
      this.menuOpen = false;
    } else if (e.code === 'Space' && !this.menuOpen) {
      this.menuOpen = true;
    } else if (e.code === 'Enter') {
      this.menuOpen = !this.menuOpen;
    } else if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
      if (!this.value && e.code === 'ArrowDown') {
        //if there is no value and the user arrows down then select the first option
        this.value = this.options[0].value;
        this.text = this.options[0].text;
        return;
      }
      const currentIndex = this.options.findIndex((x) => x.value === this.value);
      if (e.code === 'ArrowDown') {
        if (currentIndex < this.options.length - 1) {
          this.value = this.options[currentIndex + 1].value;
          this.text = this.options[currentIndex + 1].text;
        }
      } else {
        if (currentIndex > 0) {
          this.value = this.options[currentIndex - 1].value;
          this.text = this.options[currentIndex - 1].text;
        }
      }
    }
  };

  private disableWindowEvents = (e: KeyboardEvent): void => {
    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'ArrowDown') {
      e.preventDefault();
    }
  };
  detaching(): void {
    this.element.removeEventListener('keydown', this.disableWindowEvents);
    this.element.removeEventListener('keyup', this.handleKeys);
    this.element.removeEventListener('blur', this.handleBlur);
  }
}
