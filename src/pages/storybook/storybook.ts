import './storybook.scss';
import { IValidationController } from '@aurelia/validation-html';
import { IValidationRules } from '@aurelia/validation';
import { newInstanceForScope } from '@aurelia/kernel';

export class Storybook {
  data = {
    textareaInitialValue: 'Default value passed into text area',
  };
  constructor(@IValidationRules validationRules: IValidationRules, @newInstanceForScope(IValidationController) private controller: IValidationController) {
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
}
