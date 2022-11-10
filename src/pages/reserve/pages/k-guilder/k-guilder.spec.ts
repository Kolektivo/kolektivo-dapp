import '../../../../utils-testing/setup-testing';
import { EthweiValueConverter } from './../../../../resources/value-converters/ethwei';
import { Global } from '../../../../hooks/';
import { I18N } from '@aurelia/i18n';
import { IReserveStore } from 'stores/reserve-store';
import { IStore } from '../../../../stores';
import { KGuilder } from './k-guilder';
import { Registration, ValueConverter } from 'aurelia';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';

describe('<k-guilder />', () => {
  it('should have a k-page component', async () => {
    const { appHost } = await createFixture
      .html(`<k-guilder>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('k-page')).exist;
  });

  it('should have a tile and description in the k-page component', async () => {
    const { appHost } = await createFixture
      .html(`<k-guilder>`)
      .deps(...getRegistrations())
      .build().started;
    const kPage = appHost.querySelector('k-page');
    expect(kPage?.hasAttribute('title')).true;
    expect(kPage?.hasAttribute('description')).true;
  });

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

    const gridCards = getAllBy('k-grid k-card');
    expect(gridCards).toHaveLength(3);

    const [card1, card2, card3] = gridCards;
    expect(card1.textContent).toContain('navigation.reserve.k-guilder.spread.title');
    expect(card2.textContent).toContain('navigation.reserve.k-guilder.inflation-rate.title');
    expect(card3.textContent).toContain('navigation.reserve.k-guilder.tobin-tax.title');
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
      createMockStoreRegistration(),
      createMockI18nRegistration(),
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
