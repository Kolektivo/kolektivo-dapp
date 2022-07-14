import { Constructable, Controller, CustomElement, IAurelia, IContainer, LifecycleFlags } from 'aurelia';
import { ICustomElementController } from '@aurelia/runtime-html';

// eslint-disable-next-line @typescript-eslint/ban-types
export const createCustomElement = <T extends Constructable>(component: T, container: IContainer, host?: HTMLElement, values?: Object | Constructable | Record<string | number, unknown>) => {
  const instance = container.get(component);
  Object.assign(instance, values);
  const definition = CustomElement.getDefinition(component);
  const controller = Controller.$el(container, instance, host ?? container.get(IAurelia).root.host, null, definition);
  controller.activate(controller, null, LifecycleFlags.none, controller.scope);
  return { instance, controller, definition };
};

export const destroyCustomElement = async (controller: ICustomElementController): Promise<void> => {
  await controller.deactivate(controller, null, LifecycleFlags.none);
  controller.dispose();
};
