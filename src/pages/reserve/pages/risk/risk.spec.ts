import '../../../../utils-testing/setup-testing';
import { CurrencyValueConverter } from '../../../../../design-system/value-converters';
import { Global } from '../../../../hooks';
import { I18N } from '@aurelia/i18n';
import { IDesignSystemConfiguration } from '../../../../../design-system/configuration';
import { INumberService } from './../../../../services';
import { IStore } from '../../../../stores';
import { PercentageValueConverter } from './../../../../resources/value-converters';
import { Registration } from 'aurelia';
import { Risk } from './risk';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it } from 'vitest';

describe('risk', () => {
  it('should have a k-page component', async () => {
    const { appHost } = await createFixture
      .html(`<risk>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelectorAll('k-page')).exist;
  });

  it('should have a tile and description in the k-page component', async () => {
    const { appHost } = await createFixture
      .html(`<risk>`)
      .deps(...getRegistrations())
      .build().started;
    const kPage = appHost.querySelector('k-page');
    expect(kPage?.hasAttribute('title')).true;
    expect(kPage?.hasAttribute('description')).true;
  });

  it('should have a value over time card component', async () => {
    const { appHost } = await createFixture
      .html(`<risk>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('value-over-time-card')).exist;
  });

  it('should have a asset card component', async () => {
    const { appHost } = await createFixture
      .html(`<risk>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('asset-card')).exist;
  });

  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
      });
    const designSystemConfiguration = () => Registration.instance(IDesignSystemConfiguration, {});
    const numberServiceRegistration = () => Registration.instance(INumberService, {});
    return [
      Risk,
      PercentageValueConverter,
      CurrencyValueConverter,
      Global,
      createMockStoreRegistration(),
      createMockI18nRegistration(),
      designSystemConfiguration(),
      numberServiceRegistration(),
    ];
  }
});