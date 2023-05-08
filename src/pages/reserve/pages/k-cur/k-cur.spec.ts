import { Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { createFixture } from '@aurelia/testing';

import '../../../../utils-testing/setup-testing';

import { IDesignSystemConfiguration } from '../../../../design-system/configuration';
import { Currency } from '../../../../design-system/value-converters';
import { Global } from '../../../../hooks';
import { IStore } from '../../../../stores';

import { Percentage } from './../../../../resources/value-converters';
import { Ethwei } from './../../../../resources/value-converters/ethwei';
import { Multiplier } from './../../../../resources/value-converters/multiplier';
import { INumberService } from './../../../../services';
import { IReserveStore } from './../../../../stores/reserve-store';
import { KCur } from './k-cur';

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
          getLeverageRatioValueOverTime: () => new Promise((res) => res([])),
          getkCurPriceOverTime: () => new Promise((res) => res([])),
          getkCurSupplyData: () => new Promise((res) => res([])),
        }),
      ),
      KCur,
      Multiplier,
      Ethwei,
      Percentage,
      Currency,
      Global,
      createMockStoreRegistration(),
      createMockI18nRegistration(),
      designSystemConfiguration(),
      numberServiceRegistration(),
    ];
  }
});
