import { Constructable, DI, IAurelia, IContainer, IPlatform, Registration } from 'aurelia';
import { IDesignSystemConfiguration } from '../../../design-system/configuration';
import { IToastOptions } from 'design-system/elements/k-toast/toast-options';
import { KConfirm } from '../../elements/k-confirm/k-confirm';
import { KToast } from './../../elements/k-toast/k-toast';
import { createCustomElement, destroyCustomElement } from './../../aurelia-helpers';

export type INotificationService = NotificationService;
export const INotificationService = DI.createInterface<INotificationService>('INotificationService');
export class NotificationService {
  private activeToast?: KToast;

  constructor(
    @IPlatform private readonly platform: IPlatform,
    @IAurelia private readonly aurelia: IAurelia,
    @IContainer private readonly container: IContainer,
    @IDesignSystemConfiguration private readonly config: IDesignSystemConfiguration
  ) {}

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
  public toast(options: IToastOptions | string): Promise<() => void> {
    let toastOptions = options as IToastOptions;
    if (typeof options === 'string') {
      toastOptions = { message: options };
    }

    if (toastOptions.timeOut !== 0) {
      toastOptions.countdown ??= (toastOptions.timeOut ?? this.config.defaultToastTimeout ?? 0) / 1000;
    }

    return new Promise<void>(res => {
      if (!this.activeToast) res();
      const task = this.platform.taskQueue.queueTask(
        () => {
          if (!this.activeToast) {
            res();
            task.cancel();
          }
        },
        { delay: 100, persistent: true /* runs until canceled */ }
      );
    }).then(_x => {
      const { controller, instance } = createCustomElement(KToast, this.container, this.aurelia.root.host, toastOptions);
      if (toastOptions.timeOut !== 0 && (toastOptions.timeOut || this.config.defaultToastTimeout)) {
        this.activeToast = instance;
        setTimeout(() => {
          destroyCustomElement(controller);
          this.activeToast = undefined;
        }, toastOptions.timeOut ?? this.config.defaultToastTimeout);
      }

      return () => {
        destroyCustomElement(controller);
      };
    });
  }

  public static register(container: IContainer): void {
    Registration.singleton(INotificationService, NotificationService).register(container);
  }
}
