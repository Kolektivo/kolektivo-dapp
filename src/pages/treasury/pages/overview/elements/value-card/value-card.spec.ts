import { CurrencyValueConverter } from '../../../../../../../design-system/value-converters';
import { Global } from '../../../../../../hooks';
import { I18N } from '@aurelia/i18n';
import { IDesignSystemConfiguration } from '../../../../../../../design-system/configuration';
import { IStore } from '../../../../../../stores';
import { Registration } from 'aurelia';
import { ValueCard } from './value-card';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it } from 'vitest';
import { preparePlatform } from '../../../../../../utils-testing/setup-testing';

preparePlatform();

describe('value-card', () => {
  it('should have a k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<value-card>`)
      .component({})
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('#t-o-vc-card')).exist;
  });
  it('should have a title and tooltip on the k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<value-card>`)
      .component({})
      .deps(...getRegistrations())
      .build().started;
    const card = appHost.querySelector('#t-o-vc-card');
    expect(card?.getAttribute('title')).exist;
    expect(card?.getAttribute('tooltip-text')).exist;
  });
  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: () => 'Overview',
      });
    const designSystemConfiguration = () => Registration.instance(IDesignSystemConfiguration, {});
    return [ValueCard, CurrencyValueConverter, Global, createMockStoreRegistration(), createMockI18nRegistration(), designSystemConfiguration()];
  }
});