import { Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { createFixture } from '@aurelia/testing';

import 'utils-testing/setup-testing';

import { ITreasuryStore } from './../../../../../../stores/treasury-store';
import { AssetsCard } from './assets-card';

import { Global } from 'hooks';
import { IStore } from 'stores';
import { describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';

describe('assets-card', () => {
  it('should have a k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<assets-card>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('#t-o-ac-card')).exist;
  });

  it('should have a card nav component', async () => {
    const { appHost } = await createFixture
      .html(`<assets-card>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('card-nav')).exist;
  });

  it('should have an assets component', async () => {
    const { appHost } = await createFixture
      .html(`<assets-card>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('assets')).exist;
  });

  it('should not have a transaction history component', async () => {
    const { appHost } = await createFixture
      .html(`<assets-card>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('transaction-history')).toBeNull();
  });

  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
      });
    return [
      AssetsCard,
      Global,
      Registration.instance(
        ITreasuryStore,
        mock<ITreasuryStore>({
          treasuryAssets: [],
          getValueOverTime: () => new Promise((res) => res([])),
        }),
      ),
      createMockStoreRegistration(),
      createMockI18nRegistration(),
    ];
  }
});
