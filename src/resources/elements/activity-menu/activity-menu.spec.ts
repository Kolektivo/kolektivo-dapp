import '../../../utils-testing/setup-testing';
import { ActivityMenu } from './activity-menu';
import { Global } from '../../../hooks/';
import { I18N } from '@aurelia/i18n';
import { IBlockChainStore, IStore } from '../../../stores';
import { IKolektivoStore, Transaction } from './../../../stores/kolektivo-store';
import { Registration } from 'aurelia';
import { TakeValueConverter } from '../../../design-system/value-converters';
import { beforeEach, describe, expect, it } from 'vitest';
import { createFixture } from '@aurelia/testing';

describe('<activity-menu />', () => {
  let transactions: Transaction[];
  let targetedNetwork: AllowedNetworks | null;

  beforeEach(() => {
    transactions = [];
    targetedNetwork = 'Celo';
  });

  it('displays empty message when theres no transactions', async () => {
    const { appHost } = await createFixture
      .html(`<activity-menu>`)
      .deps(...getRegistrations())
      .build().started;

    expect(appHost.textContent).toContain('activity-empty');
  });

  function getRegistrations() {
    const kolektivoStore: Partial<IKolektivoStore> = {
      transactions,
    };
    const blockChainStore: Partial<IBlockChainStore> = {
      targetedNetwork,
    };

    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
      });
    return [
      ActivityMenu,
      Registration.instance(IStore, {
        kolektivoStore,
        blockChainStore,
      }),
      createMockI18nRegistration(),
      TakeValueConverter,
      Global,
    ];
  }
});
