import '../../../../../../utils-testing/setup-testing';
import { Global } from '../../../../../../hooks';
import { I18N } from '@aurelia/i18n';
import { INumberService } from './../../../../../../services/NumberService';
import { IStore } from '../../../../../../stores';
import { PercentageValueConverter } from './../../../../../../resources/value-converters/percentage';
import { PoolCard } from './pool-card';
import { Registration } from 'aurelia';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it } from 'vitest';

describe('pool-card', () => {
  it('should have a k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<pool-card>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('k-card')).exist;
  });

  it('should have a title and button in the k-card component header', async () => {
    const { appHost } = await createFixture
      .html(`<pool-card>`)
      .deps(...getRegistrations())
      .build().started;
    const card = appHost.querySelector('k-grid[slot="header"]');
    expect(card).exist;
    const title = card?.querySelector('k-text[type="h3"');
    expect(title).exist;
    const button = card?.querySelector('k-button');
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
    return [PoolCard, PercentageValueConverter, Global, createMockStoreRegistration(), createMockI18nRegistration(), numberServiceRegistration()];
  }
});
