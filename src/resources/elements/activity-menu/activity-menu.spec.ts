import { Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { createFixture } from '@aurelia/testing';

import '../../../utils-testing/setup-testing';

import { TakeValueConverter } from '../../../design-system/value-converters';
import { Global } from '../../../hooks/';
import { IBlockChainStore, IStore } from '../../../stores';

import { IKolektivoStore, Transaction } from './../../../stores/kolektivo-store';
import { ActivityMenu } from './activity-menu';

import { AllowedNetworks } from 'models/allowed-network';
import { beforeEach, describe, expect, it } from 'vitest';

describe('<activity-menu />', () => {
  let transactions: Transaction[];
  let targetedNetwork: string | undefined;

  beforeEach(() => {
    transactions = [];
    targetedNetwork = AllowedNetworks.Celo;
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
