import { NotificationAction, NotificationType } from '../../services/notification';
import { Position } from './../../types';
export interface ToastOptions {
  message?: string;
  type?: NotificationType;
  actions?: NotificationAction[];
  timeOut?: number;
  position?: Position;
}
