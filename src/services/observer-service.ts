import { DI, IContainer, IObserverLocator, Registration } from 'aurelia';
import { ICacheService } from './cache-service';
import { ISubscriber } from '@aurelia/runtime';

export type IObserverService = ObserverService;
export const IObserverService = DI.createInterface<IObserverService>('ObserverService');

export class ObserverService {
  public static register(container: IContainer): void {
    container.register(Registration.singleton(IObserverService, ObserverService));
  }

  constructor(@IObserverLocator private readonly locator: IObserverLocator, @ICacheService private readonly cacheService: ICacheService) {}

  /**
   * Make a object property observable and subscribe to changes in its value.
   * Viewmodels should use @watch.
   * @param obj object having the property to observe
   * @param property property to observe
   * @param method ISubscriber, handles changes in the property's values
   * @returns method to unsubscribe.  Singletons, such as services, don't need to call this.
   */
  // @cache<ObserverService>(function () {
  //   return { storage: this.cacheService };
  // })
  public listen<T extends object, Z extends keyof T>(obj: T, property: Z, method: ISubscriber<T[Z]>['handleChange']) {
    const observer = this.locator.getObserver(obj, property);
    const subscriber = {
      handleChange: method,
    };

    observer.subscribe(subscriber);
    return () => observer.unsubscribe(subscriber);
  }
}
