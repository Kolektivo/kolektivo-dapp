import 'utils-testing/setup-testing';
import { Global } from 'hooks';
import { I18N } from '@aurelia/i18n';
import { IStore } from 'stores';
import { Registration } from 'aurelia';
import { Reserve } from './reserve';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it } from 'vitest';
import { instance } from 'main';

describe('reserve', () => {
  it('should have an au-viewport with overview as default', async () => {
    const { appHost } = await createFixture
      .html(`<reserve>`)
      .deps(...getRegistrations())
      .build().started;
    const viewport = appHost.querySelector('au-viewport');
    expect(viewport).exist;
    expect(viewport?.getAttribute('default')).toBe('overview');
  });

  it('should have an inner-nav', async () => {
    const { appHost } = await createFixture
      .html(`<reserve>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('inner-nav')).exist;
  });

  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
      });
    return [instance, Reserve, Global, createMockStoreRegistration(), createMockI18nRegistration()];
  }
});
