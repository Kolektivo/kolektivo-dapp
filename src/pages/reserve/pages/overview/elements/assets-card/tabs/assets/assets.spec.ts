import { Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { createFixture } from '@aurelia/testing';

import '../../../../../../../../utils-testing/setup-testing';

import { Global } from '../../../../../../../../hooks';
import { IStore } from '../../../../../../../../stores';

import { Assets } from './assets';

import { IReserveStore } from 'stores/reserve-store';
import { describe, expect, it, vi } from 'vitest';

describe('assets', () => {
  it('should have a k-data-grid component', async () => {
    const { appHost } = await createFixture
      .html(`<assets>`)
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
    return [Assets, Global, createMockStoreRegistration(), Registration.instance(IReserveStore, vi.fn()), createMockI18nRegistration()];
  }
});
