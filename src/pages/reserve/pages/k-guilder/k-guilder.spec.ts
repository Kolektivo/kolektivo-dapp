import '../../../../utils-testing/setup-testing';
import { Global } from '../../../../hooks/';
import { I18N } from '@aurelia/i18n';
import { IBlockChainStore, IStore } from '../../../../stores';
import { KGuilder } from './k-guilder';
import { Registration, ValueConverter } from 'aurelia';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it } from 'vitest';

describe('<k-guilder />', () => {
  it('displays grid cards text', async () => {
    const { getAllBy } = await createFixture
      .html(`<k-guilder>`)
      .deps(...getRegistrations())
      .build().started;

    const gridCards = getAllBy('k-grid k-card');
    expect(gridCards).toHaveLength(3);

    const [card1, card2, card3] = gridCards;
    expect(card1.textContent).toContain('0.2%');
    expect(card1.textContent).toContain('navigation.reserve.k-guilder.spread.title');

    expect(card2.textContent).toContain('0.4%');
    expect(card2.textContent).toContain('navigation.reserve.k-guilder.inflation-rate.title');

    expect(card3.textContent).toContain('0.4%');
    expect(card3.textContent).toContain('navigation.reserve.k-guilder.tobin-tax.title');
  });

  it.todo('display token info card marketCap, currentPrice and totalSupply');
  it.todo('display value ratio card title with translation');

  function getRegistrations(overrides?: Partial<IBlockChainStore>) {
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
