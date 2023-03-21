import { Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { createFixture } from '@aurelia/testing';

import 'utils-testing/setup-testing';

import { IDesignSystemConfiguration } from '../../../../../../design-system';
import { Global } from '../../../../../../hooks';
import { Currency } from '../../../../../../resources';
import { IStore, ITreasuryStore } from '../../../../../../stores';

import { ValueCard } from './value-card';

import { describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';

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
      Currency,
      Registration.instance(
        ITreasuryStore,
        mock<ITreasuryStore>({
          treasuryAssets: [],
          getValueOverTime: () => new Promise((res) => res([])),
        }),
      ),
      Global,
      createMockStoreRegistration(),
      createMockI18nRegistration(),
      designSystemConfiguration(),
    ];
  }
});
