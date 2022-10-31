import '../../../../utils-testing/setup-testing';
import { CurrencyValueConverter } from '../../../../design-system/value-converters';
import { EthweiValueConverter } from './../../../../resources/value-converters/ethwei';
import { Global } from '../../../../hooks';
import { I18N } from '@aurelia/i18n';
import { IDesignSystemConfiguration } from '../../../../design-system/configuration';
import { IReserveStore } from './../../../../stores/reserve-store';
import { IStore } from '../../../../stores';
import { NumberService } from 'services';
import { Overview } from './overview';
import { PercentageValueConverter } from './../../../../resources/value-converters/percentage';
import { Registration } from 'aurelia';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it } from 'vitest';

describe('overview', () => {
  it('should have a k-page component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelectorAll('k-page')).exist;
  });

  it('should have a tile and description in the k-page component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .deps(...getRegistrations())
      .build().started;
    const kPage = appHost.querySelector('k-page');
    expect(kPage?.hasAttribute('title')).true;
    expect(kPage?.hasAttribute('description')).true;
  });

  it('should have a value card component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelectorAll('value-card')).exist;
  });

  it('should have a value by asset type card component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelectorAll('value-by-asset-type-card')).exist;
  });

  it('should have a value over time card component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelectorAll('value-over-time-card')).exist;
  });

  it('should have an assets card component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelectorAll('assets-card')).exist;
  });

  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
      });
    const designSystemConfiguration = () => Registration.instance(IDesignSystemConfiguration, {});
    return [
      Overview,
      EthweiValueConverter,
      PercentageValueConverter,
      NumberService,
      CurrencyValueConverter,
      Registration.instance(IReserveStore, {
        reserveAssets: [],
        getReserveValueOverTime: () => new Promise((res) => res([])),
      }),
      Global,
      createMockStoreRegistration(),
      createMockI18nRegistration(),
      designSystemConfiguration(),
    ];
  }
});
