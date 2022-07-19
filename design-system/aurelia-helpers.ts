import { Constructable, Controller, CustomElement, IAurelia, IContainer, LifecycleFlags, Resolved } from 'aurelia';
import { CustomElementDefinition, ICustomElementController } from '@aurelia/runtime-html';

export function createCustomElement<T extends Constructable>(
  component: T,
  container: IContainer,
  host?: HTMLElement,
  // eslint-disable-next-line @typescript-eslint/ban-types
  values?: Object | Constructable | Record<string | number, unknown>,
): { instance: Resolved<T>; controller: ICustomElementController<Resolved<T>>; definition: CustomElementDefinition<T> } {
  const instance = container.get(component);
  Object.assign(instance, values);
  const definition = CustomElement.getDefinition(component);
  const controller = Controller.$el(container, instance, host ?? container.get(IAurelia).root.host, null, definition);
  controller.activate(controller, null, LifecycleFlags.none, controller.scope);
  return { instance, controller, definition };
}

export const destroyCustomElement = async (controller: ICustomElementController): Promise<void> => {
  await controller.deactivate(controller, null, LifecycleFlags.none);
  controller.dispose();
};
