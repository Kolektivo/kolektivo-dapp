import { Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { createFixture } from '@aurelia/testing';

import '../../../../../../utils-testing/setup-testing';

import { Global } from '../../../../../../hooks';
import { INumberService } from '../../../../../../services';
import { IStore } from '../../../../../../stores';
import { IReserveStore } from '../../../../../../stores/reserve-store';

import { AssetCard } from './asset-card';

import { describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';

describe('asset-card', () => {
  it('should have a data grid component', async () => {
    const { appHost } = await createFixture
      .html(`<asset-card>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('k-data-grid')).exist;
  });

  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
      });
    const numberServiceRegistration = () => Registration.instance(INumberService, {});
    return [
      AssetCard,
      Global,
      Registration.instance(
        IReserveStore,
        mock<IReserveStore>({
          reserveAssets: [],
          getLeverageRatioValueOverTime: () => new Promise((res) => res([])),
          getkCurPriceOverTime: () => new Promise((res) => res([])),
        }),
      ),
      createMockStoreRegistration(),
      createMockI18nRegistration(),
      numberServiceRegistration(),
    ];
  }
});
