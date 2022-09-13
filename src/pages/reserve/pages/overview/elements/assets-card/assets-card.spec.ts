import '../../../../../../utils-testing/setup-testing';
import { AssetsCard } from './assets-card';
import { Global } from '../../../../../../hooks';
import { I18N } from '@aurelia/i18n';
import { IReserveStore } from 'stores/reserve-store';
import { IStore } from '../../../../../../stores';
import { Registration } from 'aurelia';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it, vi } from 'vitest';

describe('assets-card', () => {
  it('should have a k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<assets-card>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('k-card')).exist;
  });

  it('should have a title and tooltip in the k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<assets-card>`)
      .deps(...getRegistrations())
      .build().started;
    const card = appHost.querySelector('k-card');
    expect(card?.getAttribute('title')).exist;
    expect(card?.getAttribute('tooltip-text')).exist;
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
    return [AssetsCard, Global, Registration.instance(IReserveStore, vi.fn()), createMockStoreRegistration(), createMockI18nRegistration()];
  }
});
