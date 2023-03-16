import { Registration, ValueConverter } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { createFixture } from '@aurelia/testing';

import '../../../../utils-testing/setup-testing';

import { IDesignSystemConfiguration } from '../../../../design-system';
import { Global } from '../../../../hooks/';
import { CurrencyValueConverter } from '../../../../resources';
import { IStore } from '../../../../stores';
import { IReserveStore } from '../../../../stores/reserve-store';

import { EthweiValueConverter } from './../../../../resources/value-converters/ethwei';
import { KGuilder } from './k-guilder';

import { describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';

describe('<k-guilder />', () => {
  it('should have a token info card component', async () => {
    const { appHost } = await createFixture
      .html(`<k-guilder>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('token-info-card')).exist;
  });

  it('should have a value ratio card component', async () => {
    const { appHost } = await createFixture
      .html(`<k-guilder>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('value-ratio-card')).exist;
  });

  it('displays grid cards text', async () => {
    const { getAllBy } = await createFixture
      .html(`<k-guilder>`)
      .deps(...getRegistrations())
      .build().started;

    const gridCards = getAllBy('k-grid stat-card');
    expect(gridCards).toHaveLength(3);
  });

  it.todo('display token info card marketCap, currentPrice and totalSupply');
  it.todo('display value ratio card title with translation');

  function getRegistrations() {
    const createMockStoreRegistration = () =>
      Registration.instance(IStore, {
        blockChainStore: {},
      });
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
      });
    const designSystemConfiguration = () => Registration.instance(IDesignSystemConfiguration, {});
    return [
      KGuilder,
      Registration.instance(
        IReserveStore,
        mock<IReserveStore>({
          reserveAssets: [],
          getkGuilderValueRatioOverTime: () => new Promise((res) => res([])),
        }),
      ),
      EthweiValueConverter,
      CurrencyValueConverter,
      createMockStoreRegistration(),
      createMockI18nRegistration(),
      designSystemConfiguration(),
      Global,
      ValueConverter.define(
        'percentage',
        class {
          toView = (v: string) => `${v}%`;
        },
      ),
    ];
  }
});
