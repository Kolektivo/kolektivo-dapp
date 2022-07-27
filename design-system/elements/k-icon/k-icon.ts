import './k-icon.scss';
import { ICustomElementViewModel, bindable, capture } from 'aurelia';
import { IDesignSystemConfiguration } from '../../configuration';
import { numberToPixels } from './../../common';

@capture()
export class KIcon implements ICustomElementViewModel {
  @bindable name = '';
  @bindable color = '';
  @bindable({ set: numberToPixels }) top = 0;
  @bindable({ set: numberToPixels }) size = 0;
  object?: HTMLObjectElement;
  view?: string;

  constructor(@IDesignSystemConfiguration private readonly configuration: IDesignSystemConfiguration) {}

  nameChanged(): void {
    const url = this.configuration.iconMap?.get(this.name);
    if (!url) return;

    void fetch(url).then(x => {
      void x.text().then(y => (this.view = y));
    });
  }

  get styles(): Record<string, unknown> {
    return {
      fill: this.color && this.color,
      width: this.size,
      height: this.size,
      marginTop: this.top,
    };
  }

  attached(): void {
    this.nameChanged();
  }
}
