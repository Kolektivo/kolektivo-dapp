import { Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { createFixture } from '@aurelia/testing';

import '../../../../../../utils-testing/setup-testing';

import { IDesignSystemConfiguration } from '../../../../../../design-system/configuration';
import { CurrencyValueConverter } from '../../../../../../design-system/value-converters';
import { Global } from '../../../../../../hooks';
import { IStore, ITreasuryStore } from '../../../../../../stores';

import { RelativeTime } from './../../../../../../resources/value-converters/relative-time';
import { ValueOverTimeCard } from './value-over-time-card';

import { describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';

describe('value-over-time-card', () => {
  it('should have a k-stack component', async () => {
    const { appHost } = await createFixture
      .html(`<value-over-time-card>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('k-stack')).exist;
  });

  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
      });
    const designSystemConfiguration = () => Registration.instance(IDesignSystemConfiguration, {});
    return [
      ValueOverTimeCard,
      CurrencyValueConverter,
      RelativeTime,
      Global,
      Registration.instance(
        ITreasuryStore,
        mock<ITreasuryStore>({
          treasuryAssets: [],
          getValueOverTime: () => new Promise((res) => res([])),
        }),
      ),
      createMockStoreRegistration(),
      createMockI18nRegistration(),
      designSystemConfiguration(),
    ];
  }
});
