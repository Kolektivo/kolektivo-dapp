import { NotificationAction, NotificationType } from '../../services/notification';
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ToastOptions {
  title?: string;
  message?: string;
  icon?: string;
  type?: NotificationType;
  actions?: NotificationAction[];
  timeOut?: number;
  position?: Position;
  animate?: boolean;
  countdown?: number;
  close?: () => void;
}
