import { Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { createFixture } from '@aurelia/testing';

import '../../../../../../utils-testing/setup-testing';

import { IDesignSystemConfiguration } from '../../../../../../design-system/configuration';
import { Global } from '../../../../../../hooks';
import { IStore } from '../../../../../../stores';

import { PercentageValueConverter } from './../../../../../../resources/value-converters/percentage';
import { ITreasuryStore } from './../../../../../../stores/treasury-store';
import { ValueByAssetTypeCard } from './value-by-asset-type-card';

import { INumberService } from 'services/number-service';
import { describe, expect, it } from 'vitest';

describe('value-by-asset-type-card', () => {
  it('should have a k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<value-by-asset-type-card>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('k-card')).exist;
  });

  it('should have a title k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<value-by-asset-type-card>`)

      .deps(...getRegistrations())
      .build().started;
    const card = appHost.querySelector('k-card');
    expect(card?.getAttribute('title')).exist;
  });

  it('should have a k-chart doughnut component', async () => {
    const { appHost } = await createFixture
      .html(`<value-by-asset-type-card>`)
      .deps(...getRegistrations())
      .build().started;
    const chart = appHost.querySelector('k-chart');
    expect(chart).exist;
    expect(chart?.getAttribute('type')).eq('doughnut');
  });

  it('should have a chart legend with 3 values', async () => {
    const { appHost } = await createFixture
      .html(`<value-by-asset-type-card>`)
      .deps(...getRegistrations())
      .build().started;
    const chart = appHost.querySelector('#t-o-vbatc-legend');
    expect(chart).exist;
    expect(chart?.querySelectorAll('avatar-text')).toHaveLength(3);
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
      ValueByAssetTypeCard,
      PercentageValueConverter,
      Global,
      Registration.instance(ITreasuryStore, {
        treasuryAssets: [{}],
        treasuryValue: 1,
        getValueOverTime: () => new Promise((res) => res([])),
      }),
      numberServiceRegistration(),
      createMockStoreRegistration(),
      createMockI18nRegistration(),
      designSystemConfiguration(),
    ];
  }
});
