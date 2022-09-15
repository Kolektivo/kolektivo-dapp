import { DI, IContainer, IObserverLocator, Registration } from 'aurelia';
import { ISubscriber } from '@aurelia/runtime';

export type IObserverService = ObserverService;
export const IObserverService = DI.createInterface<IObserverService>('ObserverService');

export class ObserverService {
  private subscribers = new WeakMap<(...args: any) => void, ISubscriber>();

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IObserverService, ObserverService));
  }

  constructor(@IObserverLocator private readonly locator: IObserverLocator) {}

  public listen<T extends object, Z extends keyof T>(obj: T, property: Z, method: ISubscriber<Z>['handleChange']) {
    const observer = this.locator.getObserver(obj, property);
    const subscriber = {
      handleChange: method,
    };

    if (this.subscribers.has(method)) return;
    this.subscribers.set(method, subscriber);

    observer.subscribe(subscriber);
    return () => observer.unsubscribe(subscriber);
  }
}
