import './storybook.scss';
import { IGridColumn } from './../../../design-system/elements/k-data-grid/grid-column';
import { INotificationService } from '../../../design-system/services';
import { IValidationController } from '@aurelia/validation-html';
import { IValidationRules } from '@aurelia/validation';
import { newInstanceForScope } from '@aurelia/kernel';

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
      .satisfies(x => !isNaN(Date.parse(x)))
      .withMessage('Date of birth is required in the following format: DD/MM/YYYY');
    this.controller.addObject(this.data);
  }
  async openConfirmModal(): Promise<void> {
    const result = await this.notificationService.confirm('Is this cool?');
    this.notificationService.toast({ message: result + ' was clicked' });
  }

  //modal example #1
  isOpen1 = false;
  openModal1(): void {
    this.isOpen1 = !this.isOpen1;
  }
  cancel1(): void {
    this.isOpen1 = !this.isOpen1;
  }
  ok1(): void {
    this.isOpen1 = !this.isOpen1;
  }

  //modal example #2
  isOpen2 = false;
  openModal2(): void {
    this.isOpen2 = !this.isOpen2;
  }
  cancel2(): void {
    this.isOpen2 = !this.isOpen2;
  }
  ok2(): void {
    this.isOpen2 = !this.isOpen2;
  }

  //modal example #3
  isOpen3 = false;
  openModal3(): void {
    this.isOpen3 = !this.isOpen3;
  }
  ok3(): void {
    this.isOpen3 = !this.isOpen3;
  }
  cancel3(): void {
    this.isOpen3 = !this.isOpen3;
  }
  customClick(): void {
    this.notificationService.toast({ message: 'custom modal content button clicked!' });
  }

  //data grid example
  testColumns1: IGridColumn[] = [
    { headerText: 'Token', field: 'token', width: '1fr', template: '<k-grid cols="auto 1fr" gap="var(--spacing-lg)"><k-icon tooltip="this is cool" name="calendar_today"></k-icon>${token}</k-grid>' },
    { headerText: 'Price', field: 'price', width: '1fr', align: 'right', template: '${price | currency}' },
    { headerText: 'Quantity', field: 'quantity', width: '1fr', align: 'right' },
    { headerText: 'Total Value', field: 'totalValue', width: '1fr', align: 'right', template: '${price * quantity | currency}' },
    { headerText: 'Action', field: 'action', width: '1fr', template: '<k-button size="xs" click.delegate="veto(price)">Veto</k-button>' },
  ];

  public veto(price: string): void {
    this.notificationService.toast({ message: `Price is ${price}` });
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
}
