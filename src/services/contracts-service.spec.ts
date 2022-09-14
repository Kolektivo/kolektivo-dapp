import { describe, expect, it } from 'vitest';

describe('simple example', () => {
  it('sleeps for 10 seconds', () => {
    return new Promise((resolve: (args: unknown[]) => void): unknown => setTimeout(resolve, 10000)).then(() => expect(true));
  });
});
