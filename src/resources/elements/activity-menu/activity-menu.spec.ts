import { ActivityMenu } from './activity-menu';
import { Global } from '../../../hooks/';
import { I18N } from '@aurelia/i18n';
import { IBlockChainStore, IStore } from '../../../stores';
import { Registration } from 'aurelia';
import { TakeValueConverter } from '../../../../design-system/value-converters';
import { beforeEach, describe, expect, it } from 'vitest';
import { createFixture } from '@aurelia/testing';
import { preparePlatform } from '../../../utils-testing/setup-testing';

preparePlatform();

describe('<activity-menu />', () => {
  let transactions: Transaction[] = [];

  beforeEach(() => {
    transactions = [];
  });

  it('displays empty message when theres no transactions', async () => {
    const { appHost } = await createFixture
      .html(`<activity-menu>`)
      .deps(...getRegistrations())
      .build().started;

    expect(appHost.textContent).toContain('activity-empty');
  });

  function getRegistrations(overrides?: Partial<IBlockChainStore>) {
    const blockChainStore: Partial<IBlockChainStore> = {
      transactions,
      ...overrides,
    };
    const createMockStoreRegistration = () =>
      Registration.instance(IStore, {
        blockChainStore,
      });
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
      });
    return [
      ActivityMenu,
      Registration.instance(IBlockChainStore, blockChainStore),
      createMockStoreRegistration(),
      createMockI18nRegistration(),
      TakeValueConverter,
      Global,
    ];
  }
});
