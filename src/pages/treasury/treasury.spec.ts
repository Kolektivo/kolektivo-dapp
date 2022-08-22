import '../../utils-testing/setup-testing';
import { Global } from '../../hooks';
import { I18N } from '@aurelia/i18n';
import { IStore } from '../../stores';
import { Registration } from 'aurelia';
import { Treasury } from './treasury';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it } from 'vitest';

describe('treasury', () => {
  it('should have an au-viewport with overview as default', async () => {
    const { appHost } = await createFixture
      .html(`<treasury>`)
      .deps(...getRegistrations())
      .build().started;
    const viewport = appHost.querySelector('au-viewport');
    expect(viewport).exist;
    expect(viewport?.getAttribute('default')).toBe('overview');
  });

  it('should have an inner-nav', async () => {
    const { appHost } = await createFixture
      .html(`<treasury>`)
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
    return [Treasury, Global, createMockStoreRegistration(), createMockI18nRegistration()];
  }
});
