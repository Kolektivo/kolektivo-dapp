import { ICacheService } from './../services/cache-service';

export type CacheOptions = {
  storage: ICacheService;
  expiration?: Date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cache<T extends Record<string, any>>(options: (this: T) => CacheOptions) {
  return function (target: T, methodName: string, descriptor: TypedPropertyDescriptor<(...args: unknown[]) => unknown | Promise<unknown>>) {
    const cacheKeyPrefix = `${target.constructor.name}_${methodName}`;
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: unknown[]): Promise<unknown> {
      const { storage } = options.call(target);

      const key = `${cacheKeyPrefix}_${JSON.stringify(args)}`;
      const result = storage.getItem(key);

      if (result) return result;
      storage.setItem(key, await originalMethod?.apply(this, args));

      return result;
    };

    return descriptor;
  };
}
