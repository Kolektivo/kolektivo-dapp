import { Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { createFixture } from '@aurelia/testing';

import '../../../../../../utils-testing/setup-testing';

import { Global } from '../../../../../../hooks';
import { INumberService } from '../../../../../../services/number-service';
import { IStore } from '../../../../../../stores';

import { PercentageValueConverter } from './../../../../../../resources/value-converters/percentage';
import { SupplyCard } from './supply-card';

import { CurrencyValueConverter } from 'design-system/value-converters';
import { IReserveStore } from 'stores/reserve-store';
import { describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';

describe('supply-card', () => {
  it('should have a chart time filter component with 4 legends on the right', async () => {
    const { appHost } = await createFixture
      .html(`<supply-card>`)
      .deps(...getRegistrations())
      .build().started;
    const filter = appHost.querySelector('chart-time-filter');
    expect(filter).exist;
    expect(filter?.querySelectorAll('avatar-text')).toHaveLength(4);
  });

  it('should have a line chart', async () => {
    const { appHost } = await createFixture
      .html(`<supply-card>`)
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
    return [
      SupplyCard,
      PercentageValueConverter,
      Registration.instance(
        IReserveStore,
        mock<IReserveStore>({
          reserveAssets: [],
          getkCurSupplyData: () => new Promise((res) => res([])),
        }),
      ),
      Global,
      CurrencyValueConverter,
      createMockStoreRegistration(),
      createMockI18nRegistration(),
      numberServiceRegistration(),
    ];
  }
});
