import './k-icon.scss';
import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';
import { IDesignSystemConfiguration } from '../../configuration';

export class KIcon implements ICustomElementViewModel {
  @bindable name = '';
  @bindable color = '';
  @bindable top = 0;
  @bindable size = 0;
  object: HTMLObjectElement;
  view: string;

  constructor(@IDesignSystemConfiguration private readonly configuration: IDesignSystemConfiguration) {}

  nameChanged(): void {
    fetch(this.configuration.iconMap.get(this.name)).then(x => {
      x.text().then(y => (this.view = y));
    });
  }

  get styles(): Record<string, unknown> {
    return {
      fill: this.color && this.color,
      width: this.size > 0 && this.size + 'px',
      height: this.size > 0 && this.size + 'px',
      marginTop: this.top > 0 && this.top + 'px',
    };
  }

  attached(): void {
    this.nameChanged();
  }
}
(CustomElement.getDefinition(KIcon) as { capture: boolean }).capture = true;
