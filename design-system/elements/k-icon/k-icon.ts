import './k-icon.scss';
import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';
import { DesignSystemPlugin } from './../../index';

export class KIcon implements ICustomElementViewModel {
  @bindable name = '';
  @bindable color = 'black';
  object: HTMLObjectElement;
  view: string;

  nameChanged() {
    fetch(DesignSystemPlugin.iconMap.get(this.name)).then(x => {
      x.text().then(y => (this.view = y));
    });
  }

  get styles() {
    return {
      fill: this.color,
    };
  }

  attached() {
    this.nameChanged();
  }
}
(CustomElement.getDefinition(KIcon) as { capture: boolean }).capture = true;
