import { ICustomAttributeViewModel, INode, IPlatform, bindable, customAttribute } from 'aurelia';
import { INotificationService } from '../../design-system/services';

@customAttribute({ name: 'copy' })
export class Copy implements ICustomAttributeViewModel {
  @bindable()
  public value?: string;

  constructor(
    @INode private readonly element: HTMLElement,
    @IPlatform private readonly platform: IPlatform,
    @INotificationService private readonly notificationService: INotificationService,
  ) {
    element.addEventListener('click', this.copy);
  }
  private copy = () => {
    if (!this.value) return;
    void this.platform.navigator.clipboard.writeText(this.value).then(() => {
      void this.notificationService.toast({ message: 'Copied to clipboard' });
    });
  };
  detaching() {
    this.element.removeEventListener('click', this.copy);
  }
}
