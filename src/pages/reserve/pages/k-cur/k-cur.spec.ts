import '../../../../utils-testing/setup-testing';
import { CurrencyValueConverter } from '../../../../design-system/value-converters';
import { EthweiValueConverter } from './../../../../resources/value-converters/ethwei';
import { Global } from '../../../../hooks';
import { I18N } from '@aurelia/i18n';
import { IDesignSystemConfiguration } from '../../../../design-system/configuration';
import { INumberService } from './../../../../services';
import { IReserveStore } from './../../../../stores/reserve-store';
import { IStore } from '../../../../stores';
import { KCur } from './k-cur';
import { PercentageValueConverter } from './../../../../resources/value-converters';
import { Registration } from 'aurelia';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';

describe('k-cur', () => {
  it('should have a k-page component', async () => {
    const { appHost } = await createFixture
      .html(`<k-cur>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelectorAll('k-page')).exist;
  });

  it('should have a tile and description in the k-page component', async () => {
    const { appHost } = await createFixture
      .html(`<k-cur>`)
      .deps(...getRegistrations())
      .build().started;
    const kPage = appHost.querySelector('k-page');
    expect(kPage?.hasAttribute('title')).true;
    expect(kPage?.hasAttribute('description')).true;
  });

  it('should have a token info card component', async () => {
    const { appHost } = await createFixture
      .html(`<k-cur>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('token-info-card')).exist;
  });

  it('should have a pool card component', async () => {
    const { appHost } = await createFixture
      .html(`<k-cur>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('pool-card')).exist;
  });

  it('should have a leverage card component', async () => {
    const { appHost } = await createFixture
      .html(`<k-cur>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('leverage-card')).exist;
  });

  it('should have an trend card component', async () => {
    const { appHost } = await createFixture
      .html(`<k-cur>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('trend-card')).exist;
  });

  it('should have an supply card component', async () => {
    const { appHost } = await createFixture
      .html(`<k-cur>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('supply-card')).exist;
  });

  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
      });
    const designSystemConfiguration = () => Registration.instance(IDesignSystemConfiguration, {});
    const numberServiceRegistration = () => Registration.instance(INumberService, {});
    return [
      Registration.instance(
        IReserveStore,
        mock<IReserveStore>({
          reserveAssets: [],
          getLeverageRatioValueOverTime: (a) => new Promise((res) => res([])),
          getkCurPriceOverTime: (a) => new Promise((res) => res([])),
        }),
      ),
      KCur,
      EthweiValueConverter,
      PercentageValueConverter,
      CurrencyValueConverter,
      Global,
      createMockStoreRegistration(),
      createMockI18nRegistration(),
      designSystemConfiguration(),
      numberServiceRegistration(),
    ];
  }
});
