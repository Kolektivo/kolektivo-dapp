import { bindable, customElement, ICustomElementViewModel } from 'aurelia';

import template from './k-confirm.html';
@customElement({ name: 'k-confirm', template })
export class KConfirm implements ICustomElementViewModel {
  @bindable message = 'Are you sure?';

  confirm = (result?: boolean) => {
    return result ?? false;
  };
}
