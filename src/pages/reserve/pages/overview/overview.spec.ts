import { Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { createFixture } from '@aurelia/testing';

import '../../../../utils-testing/setup-testing';

import { IDesignSystemConfiguration } from '../../../../design-system/configuration';
import { CurrencyValueConverter } from '../../../../design-system/value-converters';
import { Global } from '../../../../hooks';
import { NumberService } from '../../../../services';
import { IStore } from '../../../../stores';

import { EthweiValueConverter } from './../../../../resources/value-converters/ethwei';
import { PercentageValueConverter } from './../../../../resources/value-converters/percentage';
import { IReserveStore } from './../../../../stores/reserve-store';
import { Overview } from './overview';

import { describe, expect, it } from 'vitest';

describe('overview', () => {
  it('should have a k-page component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelectorAll('k-page')).exist;
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
