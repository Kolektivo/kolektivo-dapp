import { AssetsCard } from './assets-card';
import { Global } from '../../../../../../hooks';
import { I18N } from '@aurelia/i18n';
import { IStore } from '../../../../../../stores';
import { Registration } from 'aurelia';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it } from 'vitest';
import { preparePlatform } from '../../../../../../utils-testing/setup-testing';

preparePlatform();

describe('assets-card', () => {
  it('should have a k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<assets-card>`)
      .component({})
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('#t-o-ac-card')).exist;
  });
  it('should have a title k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<assets-card>`)
      .component({})
      .deps(...getRegistrations())
      .build().started;
    const card = appHost.querySelector('#t-o-ac-card');
    expect(card?.getAttribute('title')).exist;
  });
  it('should have a card nav component', async () => {
    const { appHost } = await createFixture
      .html(`<assets-card>`)
      .component({})
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('card-nav')).exist;
  });
  it('should have an assets component', async () => {
    const { appHost } = await createFixture
      .html(`<assets-card>`)
      .component({})
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('assets')).exist;
  });
  it('should not have a transaction history component', async () => {
    const { appHost } = await createFixture
      .html(`<assets-card>`)
      .component({})
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('transaction-history')).toBeNull();
  });
  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: () => 'Overview',
      });
    return [AssetsCard, Global, createMockStoreRegistration(), createMockI18nRegistration()];
  }
});
