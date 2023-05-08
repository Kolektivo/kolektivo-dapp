import { Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { createFixture } from '@aurelia/testing';

import '../../../../../../utils-testing/setup-testing';

import { Global } from '../../../../../../hooks';
import { INumberService } from '../../../../../../services/number-service';
import { IStore } from '../../../../../../stores';

import { Percentage } from './../../../../../../resources/value-converters/percentage';
import { PoolCard } from './pool-card';

import { describe, expect, it } from 'vitest';

describe('pool-card', () => {
  it('should have a title and button in the k-card component header', async () => {
    const { appHost } = await createFixture
      .html(`<pool-card>`)
      .deps(...getRegistrations())
      .build().started;
    const stack = appHost.querySelector('k-stack');
    expect(stack).exist;
    const title = stack?.querySelector('k-text');
    expect(title).exist;
    const button = stack?.querySelector('k-button');
    expect(button).exist;
  });

  it('should have a data grid component', async () => {
    const { appHost } = await createFixture
      .html(`<pool-card>`)
      .deps(...getRegistrations())
      .build().started;
    const grid = appHost.querySelector('k-data-grid');
    expect(grid).exist;
  });

  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
      });
    const numberServiceRegistration = () => Registration.instance(INumberService, {});
    return [PoolCard, Percentage, Global, createMockStoreRegistration(), createMockI18nRegistration(), numberServiceRegistration()];
  }
});
