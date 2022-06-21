import './storybook.scss';
import { IValidationController } from '@aurelia/validation-html';
import { IValidationRules } from '@aurelia/validation';
import { newInstanceForScope } from '@aurelia/kernel';

export class Storybook {
  data = {};
  constructor(@IValidationRules validationRules: IValidationRules, @newInstanceForScope(IValidationController) private controller: IValidationController) {
    validationRules.on(this.data).ensure('name').maxLength(10);
    this.controller.addObject(this.data);
  }
}
