// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ToastOptions {
  title?: string;
  message?: string;
  icon?: string;
  type?: NotificationType;
  content?: string;
  timeOut?: number;
  position?: Position;
  animate?: boolean;
  countdown?: number;
  close?: () => void;
}
