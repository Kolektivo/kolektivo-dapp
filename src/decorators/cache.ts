import { ICacheService } from './../services/cache-service';

export type CacheOptions = {
  storage: ICacheService;
  expiration?: Date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cache<T extends Record<string, any>>(options: (this: T) => CacheOptions) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (target: T, methodName: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => any | Promise<any>>) {
    const cacheKeyPrefix = `${target.constructor.name}_${methodName}`;
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: unknown[]): unknown {
      const { storage } = options.call(this as T);

      const key = `${cacheKeyPrefix}_${JSON.stringify(args)}`;
      let result = storage.getItem(key);

      if (result) return result;
      result = originalMethod?.apply(this, args);
      storage.setItem(key, result);

      return result;
    };

    return descriptor;
  };
}
