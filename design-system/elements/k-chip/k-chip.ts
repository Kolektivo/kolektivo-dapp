import { ICustomElementViewModel, bindable, capture } from 'aurelia';
import { NotificationType } from './../../services/notification/notification-type';
import { ifExistsThenTrue } from '../../../design-system/common';

@capture()
export class KChip implements ICustomElementViewModel {
  @bindable type: NotificationType = 'primary';
  @bindable icon = '';
  @bindable({ set: ifExistsThenTrue }) border = false;
}
