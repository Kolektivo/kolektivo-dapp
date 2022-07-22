import { NotificationAction, NotificationType } from '../../services/notification';
import { Position } from './../../types';
export interface IToastOptions {
  message?: string;
  type?: NotificationType;
  actions?: NotificationAction[];
  timeOut?: number;
  position?: Position;
  animate?: boolean;
  countdown?: number;
}
