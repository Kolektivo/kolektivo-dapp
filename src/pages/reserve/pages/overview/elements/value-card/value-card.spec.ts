import '../../../../../../utils-testing/setup-testing';
import { CurrencyValueConverter } from '../../../../../../design-system/value-converters';
import { EthweiValueConverter } from './../../../../../../resources/value-converters/ethwei';
import { Global } from '../../../../../../hooks';
import { I18N } from '@aurelia/i18n';
import { IDesignSystemConfiguration } from '../../../../../../design-system/configuration';
import { IReserveStore } from 'stores/reserve-store';
import { IStore } from '../../../../../../stores';
import { NumberService } from 'services';
import { PercentageValueConverter } from './../../../../../../resources/value-converters/percentage';
import { Registration } from 'aurelia';
import { ValueCard } from './value-card';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it, vi } from 'vitest';

describe('value-card', () => {
  it('should have a k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<value-card>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('k-card')).exist;
  });

  it('should have a title and tooltip on the k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<value-card>`)
      .deps(...getRegistrations())
      .build().started;
    const card = appHost.querySelector('k-card');
    expect(card?.getAttribute('title')).exist;
    expect(card?.getAttribute('tooltip-text')).exist;
  });

  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
      });
    const designSystemConfiguration = () => Registration.instance(IDesignSystemConfiguration, {});
    return [
      ValueCard,
      EthweiValueConverter,
      PercentageValueConverter,
      CurrencyValueConverter,
      NumberService,
      Registration.instance(IReserveStore, vi.fn()),
      Global,
      createMockStoreRegistration(),
      createMockI18nRegistration(),
      designSystemConfiguration(),
    ];
  }
});
