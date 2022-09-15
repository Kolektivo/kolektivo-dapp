import { DI, IContainer, IObserverLocator, Registration } from 'aurelia';
import { ISubscriber } from '@aurelia/runtime';

export type IObserverService = ObserverService;
export const IObserverService = DI.createInterface<IObserverService>('ObserverService');

export class ObserverService {
  private subscribers = new WeakMap<(...args: any) => void, ISubscriber & { unsubscribe: () => void }>();

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IObserverService, ObserverService));
  }

  constructor(@IObserverLocator private readonly locator: IObserverLocator) {}

  public listen<T extends object>(obj: T, property: keyof T, method: ISubscriber<typeof property>['handleChange']) {
    const observer = this.locator.getObserver(obj, property);
    const subscriber = {
      handleChange: method,
      unsubscribe: () => {
        observer.unsubscribe(subscriber);
      },
    };

    if (this.subscribers.has(method)) return;
    this.subscribers.set(method, subscriber);

    observer.subscribe(subscriber);
  }

  public unlisten<T>(method: ISubscriber<T>['handleChange']) {
    this.subscribers.get(method)?.unsubscribe();
  }
}
