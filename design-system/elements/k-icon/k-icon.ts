import './k-icon.scss';
import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';
import { DesignSystemPlugin } from './../../index';

export class KIcon implements ICustomElementViewModel {
  @bindable name = '';
  @bindable color = '';
  @bindable top = 0;
  @bindable size = 0;
  object: HTMLObjectElement;
  view: string;

  nameChanged() {
    fetch(DesignSystemPlugin.iconMap.get(this.name)).then(x => {
      x.text().then(y => (this.view = y));
    });
  }

  get styles() {
    return {
      fill: this.color && this.color,
      width: this.size > 0 && this.size + 'px',
      height: this.size > 0 && this.size + 'px',
      marginTop: this.top > 0 && this.top + 'px',
    };
  }

  attached() {
    this.nameChanged();
  }
}
(CustomElement.getDefinition(KIcon) as { capture: boolean }).capture = true;
