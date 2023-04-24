import { Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { createFixture } from '@aurelia/testing';

import '../../../../../../utils-testing/setup-testing';

import { IDesignSystemConfiguration } from '../../../../../../design-system';
import { Global } from '../../../../../../hooks';
import { Currency } from '../../../../../../resources';
import { INumberService } from '../../../../../../services/number-service';
import { IReserveStore, IStore } from '../../../../../../stores';

import { Percentage } from './../../../../../../resources/value-converters/percentage';
import { TrendCard } from './trend-card';

import { describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';

describe('trend-card', () => {
  it('should have a chart time filter component', async () => {
    const { appHost } = await createFixture
      .html(`<trend-card>`)
      .deps(...getRegistrations())
      .build().started;
    const filter = appHost.querySelector('chart-time-filter');
    expect(filter).exist;
  });

  it('should have a line chart', async () => {
    const { appHost } = await createFixture
      .html(`<trend-card>`)
      .deps(...getRegistrations())
      .build().started;
    const chart = appHost.querySelector('k-chart');
    expect(chart).exist;
  });

  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
      });
    const numberServiceRegistration = () => Registration.instance(INumberService, {});
    const designSystemConfiguration = () => Registration.instance(IDesignSystemConfiguration, {});
    return [
      TrendCard,
      Percentage,
      Currency,
      Registration.instance(
        IReserveStore,
        mock<IReserveStore>({
          getkCurPriceOverTime: () => new Promise((res) => res([])),
        }),
      ),
      Global,
      createMockStoreRegistration(),
      createMockI18nRegistration(),
      designSystemConfiguration(),
      numberServiceRegistration(),
    ];
  }
});
