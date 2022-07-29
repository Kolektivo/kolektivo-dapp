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

/**
 * Remove precision from the decimals part of a number. Need this instead of `toFixed` because
 * the latter adds phantom numbers with decimals > 16
 * @param num
 * @returns
 */
export function truncateDecimals(num: number, decimals: number): number {
  if (typeof num !== 'number' || Number.isInteger(num) || isNaN(num)) {
    return num;
  }
  const parts = num.toString().split('.');
  return Number(`${parts[0]}.${parts[1].slice(0, decimals)}`);
}
