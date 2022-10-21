import { DI } from 'aurelia';
import { createEthereumService } from 'utils-testing/utils';
import { describe, expect, it } from 'vitest';

describe('ethereum-service.ts', () => {
  it('getBlock works', async () => {
    const container = DI.createContainer();
    const ethereumService = createEthereumService(container);
    expect((await ethereumService.getBlock(1)).number).toBe(1);
  });
});
