import { customElement } from 'aurelia';
import { newInstanceForScope } from '@aurelia/kernel';
import { IValidationRules } from '@aurelia/validation';
import { IValidationController } from '@aurelia/validation-html';

import { IGridColumn } from '../../design-system/elements/k-data-grid/grid-column';
import { INotificationService } from '../../design-system/services';

import template from './storybook.html';

import './storybook.scss';

@customElement({ name: 'storybook', template })
export class Storybook {
  showAnimate1 = true;
  showCountdowns = true;
  showLoader1 = false;

  toggleLoader1(): void {
    this.showLoader1 = !this.showLoader1;
    setTimeout(() => (this.showLoader1 = !this.showLoader1), 2000);
  }

  toggleAnimation1(): void {
    this.showAnimate1 = !this.showAnimate1;
  }

  showAnimate2 = true;

  toggleAnimation2(): void {
    this.showAnimate2 = !this.showAnimate2;
  }

  data = {
    textareaInitialValue: 'Default value passed into text area',
  };

  resetCountdowns(): void {
    this.showCountdowns = false;
    this.showCountdowns = true;
  }

  seed() {
    //void seed();
  }

  constructor(
    @IValidationRules validationRules: IValidationRules,
    @newInstanceForScope(IValidationController) private controller: IValidationController,
    @INotificationService private readonly notificationService: INotificationService,
  ) {
    validationRules
      .on(this.data)
      .ensure('required')
      .required()
      .ensure('email')
      .email()
      .withMessage('Please enter an email address with the following format: name@example.com')
      .ensure('birthdate')
      .satisfies((x) => !isNaN(Date.parse(String(x))))
      .withMessage('Date of birth is required in the following format: DD/MM/YYYY')
      .satisfies((x) => new Date(String(x)) < new Date())
      .withMessage("Date of birth can't be in the future")
      .satisfies((x) => new Date(String(x)) < new Date())
      .withMessage('Another condition that triggers multiple errors');
    this.controller.addObject(this.data);
  }
  async openConfirmModal(): Promise<void> {
    const result = await this.notificationService.confirm('Is this cool?');
    void this.notificationService.toast({ message: `${String(result)} was clicked` });
  }

  //modal example #1
  isOpen1 = false;
  openModal1 = () => {
    this.isOpen1 = !this.isOpen1;
  };
  cancel1 = () => {
    this.isOpen1 = !this.isOpen1;
  };
  ok1(): void {
    this.isOpen1 = !this.isOpen1;
  }

  //modal example #2
  isOpen2 = false;
  openModal2 = () => {
    this.isOpen2 = !this.isOpen2;
  };
  cancel2 = () => {
    this.isOpen2 = !this.isOpen2;
  };
  ok2 = () => {
    this.isOpen2 = !this.isOpen2;
  };

  //modal example #3
  isOpen3 = false;
  openModal3 = () => {
    this.isOpen3 = !this.isOpen3;
  };
  ok3 = () => {
    this.isOpen3 = !this.isOpen3;
  };
  cancel3 = () => {
    this.isOpen3 = !this.isOpen3;
  };
  customClick = () => {
    void this.notificationService.toast({ message: 'custom modal content button clicked!' });
  };

  //data grid example
  testColumns1: IGridColumn[] = [
    {
      headerText: 'Token',
      field: 'token',
      width: '1fr',
      template: '<k-grid cols="auto 1fr" gap="var(--spacing-lg)"><k-icon tooltip="this is cool" name="calendar_today"></k-icon>${token}</k-grid>',
    },
    { headerText: 'Price', field: 'price', width: '1fr', align: 'right', template: '${price | currency}' },
    { headerText: 'Quantity', field: 'quantity', width: '1fr', align: 'right' },
    { headerText: 'Total Value', field: 'totalValue', width: '1fr', align: 'right', template: '${price * quantity | currency}' },
    { headerText: 'Action', field: 'action', width: '1fr', template: '<k-button size="xs" click.trigger="veto(price)">Veto</k-button>' },
  ];

  public veto(price: string): void {
    void this.notificationService.toast({ message: `Price is ${price}` });
  }

  testData1 = [
    { token: 'XXX', price: '1', quantity: 400 },
    { token: 'XXX', price: '2', quantity: 400 },
    { token: 'XXX', price: '3', quantity: 400 },
    { token: 'XXX', price: '4', quantity: 400 },
    { token: 'XXX', price: '5', quantity: 400 },
    { token: 'XXX', price: '6', quantity: 400 },
    { token: 'XXX', price: '7', quantity: 400 },
    { token: 'XXX', price: '8', quantity: 400 },
  ];

  //toast examples
  public toast1(): void {
    void this.notificationService.toast({
      message: 'This is a normal toast. It will stay for 5 seconds by default.',
      content: '<k-link src="https://celoscan.io/" external>View on Celoscan</k-link> ',
    });
  }

  public toastInfo(): void {
    void this.notificationService.toast({
      message: 'This is an informational toast. It will stay for 5 seconds by default.',
      type: 'info',
      content: '<k-link src="https://celoscan.io/" external>View on Celoscan</k-link> ',
    });
  }

  public toastWarning(): void {
    void this.notificationService.toast({
      message: 'This is a warning toast. It will stay for 5 seconds by default.',
      type: 'warning',
      content: '<k-link src="https://celoscan.io/" external>View on Celoscan</k-link> ',
    });
  }

  public toastError(): void {
    void this.notificationService.toast({
      message: 'This is an error toast. It will stay for 5 seconds by default.',
      type: 'danger',
      content: '<k-link src="https://celoscan.io/" external>View on Celoscan</k-link> ',
    });
  }
  syncData() {
    import('../../firebase');
  }
}
