import '../../../../../../utils-testing/setup-testing';
import { AssetCard } from './asset-card';
import { Global } from '../../../../../../hooks';
import { I18N } from '@aurelia/i18n';
import { IStore } from '../../../../../../stores';
import { Registration } from 'aurelia';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it } from 'vitest';

describe('asset-card', () => {
  it('should have a k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<asset-card>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('k-card')).exist;
  });

  it('should have a title and tooltip in the k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<asset-card>`)
      .deps(...getRegistrations())
      .build().started;
    const card = appHost.querySelector('k-card');
    expect(card?.getAttribute('title')).exist;
    expect(card?.getAttribute('tooltip-text')).exist;
  });

  it('should have a data grid component', async () => {
    const { appHost } = await createFixture
      .html(`<asset-card>`)
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
    return [AssetCard, Global, createMockStoreRegistration(), createMockI18nRegistration()];
  }
});
