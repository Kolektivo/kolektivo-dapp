import { Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { createFixture } from '@aurelia/testing';

import '../../../../../../utils-testing/setup-testing';

import { IDesignSystemConfiguration } from '../../../../../../design-system/configuration';
import { Global } from '../../../../../../hooks';
import { Ethwei } from '../../../../../../resources';
import { INumberService } from '../../../../../../services';
import { IStore } from '../../../../../../stores';
import { IReserveStore } from '../../../../../../stores/reserve-store';

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
    const numberServiceRegistration = () => Registration.instance(INumberService, {});
    return [
      ValueOverTimeCard,
      Global,
      Registration.instance(
        IReserveStore,
        mock<IReserveStore>({
          getReserveValueOverTime: () => new Promise((res) => res([])),
        }),
      ),
      Ethwei,
      numberServiceRegistration(),
      createMockStoreRegistration(),
      createMockI18nRegistration(),
      designSystemConfiguration(),
    ];
  }
});
