import { Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { createFixture } from '@aurelia/testing';

import '../../../../../../utils-testing/setup-testing';

import { IDesignSystemConfiguration } from '../../../../../../design-system/configuration';
import { Currency } from '../../../../../../design-system/value-converters';
import { Global } from '../../../../../../hooks';
import { IReserveStore, IStore } from '../../../../../../stores';

import { Ethwei } from './../../../../../../resources/value-converters/ethwei';
import { TokenInfoCard } from './token-info-card';

import { describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';

describe('token-info-card', () => {
  it('should have a k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<token-info-card>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('k-card')).exist;
  });

  it('should have a color, title and avatar on the k-card', async () => {
    const { appHost } = await createFixture
      .html(`<token-info-card>`)
      .deps(...getRegistrations())
      .build().started;
    const kCard = appHost.querySelector('k-card');
    expect(kCard?.hasAttribute('color')).true;
    expect(kCard?.hasAttribute('title')).true;
    expect(kCard?.hasAttribute('title-avatar.bind')).true;
  });

  it('should have a 3 col k-grid with three labels and tooltips', async () => {
    const { appHost } = await createFixture
      .html(`<token-info-card>`)
      .deps(...getRegistrations())
      .build().started;
    const kGrid = appHost.querySelector('#r-kGuilder-tic-stats');
    expect(kGrid?.getAttribute('cols')).eq('3');
    const labels = kGrid?.querySelectorAll('label-value');
    expect(labels).toHaveLength(3);
    labels?.forEach((label) => expect(label.getAttribute('tooltip-text')).exist);
  });

  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
      });
    const designSystemConfiguration = () => Registration.instance(IDesignSystemConfiguration, {});
    return [
      TokenInfoCard,
      Currency,
      Registration.instance(
        IReserveStore,
        mock<IReserveStore>({
          reserveAssets: [],
          getkGuilderValueRatioOverTime: () => new Promise((res) => res([])),
        }),
      ),
      Ethwei,
      Global,
      createMockStoreRegistration(),
      createMockI18nRegistration(),
      designSystemConfiguration(),
    ];
  }
});
