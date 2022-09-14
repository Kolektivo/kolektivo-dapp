import '../../../../../../../../utils-testing/setup-testing';
import { Global } from '../../../../../../../../hooks';
import { I18N } from '@aurelia/i18n';
import { IReserveStore } from 'stores/reserve-store';
import { IStore } from '../../../../../../../../stores';
import { Registration } from 'aurelia';
import { TransactionHistory } from './transaction-history';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it, vi } from 'vitest';

describe('transaction-history', () => {
  it('should have a k-data-grid component', async () => {
    const { appHost } = await createFixture
      .html(`<transaction-history>`)
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
    return [TransactionHistory, Global, Registration.instance(IReserveStore, vi.fn()), createMockStoreRegistration(), createMockI18nRegistration()];
  }
});
