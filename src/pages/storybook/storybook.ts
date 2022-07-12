import './storybook.scss';
import { INotificationService } from '../../../design-system/services';
import { IValidationController } from '@aurelia/validation-html';
import { IValidationRules } from '@aurelia/validation';
import { newInstanceForScope } from '@aurelia/kernel';

export class Storybook {
  showAnimate1 = true;
  showCountdowns = true;
  isOpen = false;
  toggleAnimation1() {
    this.showAnimate1 = !this.showAnimate1;
  }
  showAnimate2 = true;
  toggleAnimation2() {
    this.showAnimate2 = !this.showAnimate2;
  }
  data = {
    textareaInitialValue: 'Default value passed into text area',
  };
  resetCountdowns() {
    this.showCountdowns = false;
    this.showCountdowns = true;
  }
  constructor(@IValidationRules validationRules: IValidationRules, @newInstanceForScope(IValidationController) private controller: IValidationController, @INotificationService private readonly notificationService: INotificationService) {
    validationRules
      .on(this.data)
      .ensure('required')
      .required()
      .ensure('email')
      .email()
      .withMessage('Please enter an email address with the following format: name@example.com')
      .ensure('birthdate')
      .satisfies(x => !isNaN(Date.parse(x)))
      .withMessage('Date of birth is required in the following format: DD/MM/YYYY');
    this.controller.addObject(this.data);
  }
  async openConfirmModal() {
    const result = await this.notificationService.confirm('Is this cool?');
    this.notificationService.toast({ message: result + ' was clicked' });
  }
  openModal() {
    this.isOpen = !this.isOpen;
  }
  cancel() {
    this.isOpen = !this.isOpen;
  }
  ok() {
    this.isOpen = !this.isOpen;
  }
}
