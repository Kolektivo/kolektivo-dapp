import { Constructable, Controller, CustomElement, DI, IAurelia, IContainer, LifecycleFlags, Registration } from 'aurelia';
import { KConfirm } from '../elements/k-confirm/k-confirm';

export type INotificationService = NotificationService;
export const INotificationService = DI.createInterface<INotificationService>('NotificationService');
export class NotificationService {
  constructor(@IAurelia private readonly aurelia: IAurelia, @IContainer private readonly container: IContainer) {}

  async confirm(message?: string, component?: Constructable<{ message?: string; confirm: (result?: boolean) => boolean | Promise<boolean> }>) {
    return new Promise(res => {
      component ??= KConfirm;
      const instance = this.container.get(component);
      if (message) {
        instance.message = message;
      }
      const definition = CustomElement.getDefinition(component);
      const confirm = instance.confirm;
      instance.confirm = async value => {
        const result = await confirm(value);
        await controller.deactivate(controller, null, LifecycleFlags.none);
        await controller.dispose();
        res(result);
        return result;
      };
      const controller = Controller.$el(this.container, instance, this.aurelia.root.host, null, definition);
      controller.activate(controller, null, LifecycleFlags.none, controller.scope);
    });
  }

  public static register(container: IContainer) {
    Registration.singleton(INotificationService, NotificationService).register(container);
  }
}
