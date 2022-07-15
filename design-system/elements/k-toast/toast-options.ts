import { INotificationAction, NotificationType } from '../../services/notification';
import { Position } from './../../types';
export interface IToastOptions {
  message?: string;
  type?: NotificationType;
  actions?: INotificationAction[];
  timeOut?: number;
  position?: Position;
}
