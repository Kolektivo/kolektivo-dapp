import { Constructable, DI, IAurelia, IContainer, Registration } from 'aurelia';
import { IDesignSystemConfiguration } from '../../../design-system/configuration';
import { KConfirm } from '../../elements/k-confirm/k-confirm';
import { KToast } from './../../elements/k-toast/k-toast';
import { ToastOptions } from 'design-system/elements/k-toast/toast-options';
import { createCustomElement, destroyCustomElement } from './../../aurelia-helpers';

export type INotificationService = NotificationService;
export const INotificationService = DI.createInterface<INotificationService>('INotificationService');
export class NotificationService {
  activeToasts: KToast[] = [];

  constructor(@IAurelia private readonly aurelia: IAurelia, @IContainer private readonly container: IContainer, @IDesignSystemConfiguration private readonly config: IDesignSystemConfiguration) {}

  public async confirm(message?: string, component?: Constructable<{ message?: string; confirm: (result?: boolean) => boolean | Promise<boolean> }>): Promise<boolean> {
    return new Promise(res => {
      component ??= KConfirm;
      const { controller, instance } = createCustomElement(component, this.container, this.aurelia.root.host);

      if (message) {
        instance.message = message;
      }
      const confirm = instance.confirm;
      instance.confirm = async (value): Promise<boolean> => {
        const result = await confirm(value);
        await destroyCustomElement(controller);
        res(result);
        return result;
      };
    });
  }

  /**
   *
   * @param options
   * @returns A function to close the toast with
   */
  public toast(options: ToastOptions): () => void {
    const { controller, instance } = createCustomElement(KToast, this.container, this.aurelia.root.host, options);
    this.activeToasts.push(instance);
    if (options.timeOut || this.config.defaultToastTimeout) {
      setTimeout(() => {
        destroyCustomElement(controller);
        this.activeToasts.splice(
          this.activeToasts.findIndex(x => x == instance),
          1,
        );
      }, options.timeOut ?? this.config.defaultToastTimeout);
    }

    return () => {
      destroyCustomElement(controller);
    };
  }

  public static register(container: IContainer): void {
    Registration.singleton(INotificationService, NotificationService).register(container);
  }
}
