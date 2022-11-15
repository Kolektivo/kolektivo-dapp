import { callOnce } from './call-once';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('@callOnce', () => {
  const mock = vi.fn();

  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {
      /* less noisy with this mock  */
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('calls static method only once', () => {
    class Abc {
      @callOnce('dont call twice')
      static initialize() {
        mock('calling');
      }
    }

    Abc.initialize();
    Abc.initialize();

    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith('calling');
  });

  it('calls instance method only once', () => {
    class Abc {
      @callOnce('dont call twice')
      initialize() {
        mock('calling');
      }
    }

    const i = new Abc();
    i.initialize();
    i.initialize();

    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith('calling');
  });

  it('calls instance method on different instance once', () => {
    class Abc {
      @callOnce('dont call twice')
      initialize() {
        mock('calling');
      }
    }

    const i = new Abc();
    i.initialize();
    i.initialize();

    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith('calling');

    const i2 = new Abc();
    i2.initialize();
    i2.initialize();

    expect(mock).toBeCalledTimes(2);
    expect(mock).toHaveBeenLastCalledWith('calling');
  });

  it('throws on non method usage', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      class Abc {
        // @ts-expect-error
        @callOnce()
        initialize = 1;
      }
    }).toThrowError(/ER: @callOnce:/);
  });

  it('logs predefined message when calling instance method twice', () => {
    class Abc {
      @callOnce('dont call twice')
      initialize() {
        mock('calling');
      }
    }

    let count = 0;
    vi.spyOn(console, 'warn').mockImplementationOnce((message) => {
      expect(message).toContain('dont call twice');
      count = 1;
    });

    const i = new Abc();
    i.initialize();
    i.initialize();

    expect(count).toBe(1);
  });
});
