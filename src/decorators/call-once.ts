/**
 * Decorate on a method to ensure it's called only once no matter how many times it's invoked
 */
export function callOnce(errorMessage = '') {
  const cache = new WeakMap();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (target: any, propertyKey: PropertyKey, descriptor: PropertyDescriptor) {
    // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-unsafe-member-access
    const fn = target[propertyKey] as Function;
    if (typeof fn !== 'function') {
      if (process.env.NODE_ENV !== 'production') {
        throw new Error(`ER: @callOnce: Invalid decorator target: "${String(propertyKey)}", can only be used on a method.`);
      } else {
        throw new Error(`ER: @callOnce: > ${String(propertyKey)}`);
      }
    }

    descriptor.value = function (...args: unknown[]) {
      if (cache.has(this)) {
        // checking against production so that we can have test run this code too
        if (process.env.NODE_ENV !== 'production' && errorMessage) {
          // eslint-disable-next-line no-console
          console.warn(`Warning: @callOnce: ${String(propertyKey)} ${errorMessage}`);
          // eslint-disable-next-line no-console
          console.warn(new Error().stack);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return cache.get(this);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
      const ret = fn.apply(this, args);
      cache.set(this, ret);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return ret;
    };
  };
}
