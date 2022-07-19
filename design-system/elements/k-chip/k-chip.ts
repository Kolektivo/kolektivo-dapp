import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';
import { IfExistsThenTrue } from '../../../design-system/common';
import { NotificationType } from './../../services/notification/notification-type';

export class KChip implements ICustomElementViewModel {
  @bindable type: NotificationType = 'primary';
  @bindable icon = '';
  @bindable({ set: IfExistsThenTrue }) border = false;
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
(CustomElement.getDefinition(KChip) as { capture: boolean }).capture = true;
