import { CurrencyValueConverter } from '../../../../../design-system/value-converters';
import { Global } from '../../../../hooks';
import { I18N } from '@aurelia/i18n';
import { IDesignSystemConfiguration } from '../../../../../design-system/configuration';
import { IStore } from '../../../../stores';
import { Overview } from './overview';
import { Registration } from 'aurelia';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it } from 'vitest';
import { preparePlatform } from '../../../../utils-testing/setup-testing';

preparePlatform();

describe('overview', () => {
  it('should have a k-page component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .component({})
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelectorAll('k-page')).toHaveLength(1);
  });
  it('should have a tile and description in the k-page component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .component({})
      .deps(...getRegistrations())
      .build().started;
    const kPage = appHost.querySelectorAll('k-page');
    expect(kPage[0].hasAttribute('title')).true;
    expect(kPage[0].hasAttribute('description')).true;
  });
  it('should have a token info card component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .component({})
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelectorAll('token-info-card')).toHaveLength(1);
  });
  it('should have a value card component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .component({})
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelectorAll('value-card')).toHaveLength(1);
  });
  it('should have a value by asset type card component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .component({})
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelectorAll('value-by-asset-type-card')).toHaveLength(1);
  });
  it('should have a value over time card component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .component({})
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelectorAll('value-over-time-card')).toHaveLength(1);
  });
  it('should have an assets card component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .component({})
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelectorAll('assets-card')).toHaveLength(1);
  });
  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: () => 'Overview',
      });
    const designSystemConfiguration = () => Registration.instance(IDesignSystemConfiguration, {});
    return [Overview, CurrencyValueConverter, Global, createMockStoreRegistration(), createMockI18nRegistration(), designSystemConfiguration()];
  }
});
