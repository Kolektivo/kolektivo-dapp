import { ButtonColor, ButtonType } from './../../elements/k-button/k-button';
import { ButtonSize } from './../../elements/k-button/button-size';
export interface NotificationAction {
  content: string;
  type?: ButtonType;
  color?: ButtonColor;
  size?: ButtonSize;
  onClick: () => void;
}
