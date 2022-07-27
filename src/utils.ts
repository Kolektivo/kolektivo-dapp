import { NotificationType } from 'design-system/services/notification/notification-type';

export function getColorByType(type: NotificationType): string {
  switch (type) {
    case 'danger':
      return 'var(--error)';
    case 'dark':
      return 'var(--dark)';
    case 'info':
      return 'var(--info)';
    case 'primary':
      return 'var(--primary)';
    case 'secondary':
      return 'var(--dark-coral-700)';
    case 'success':
      return 'var(--success)';
    case 'warning':
      return 'var(--warning)';
  }
}
