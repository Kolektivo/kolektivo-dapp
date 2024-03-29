import { IPlatform, PLATFORM, Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { createFixture } from '@aurelia/testing';

import 'utils-testing/setup-testing';

import { IDesignSystemConfiguration } from '../../../../design-system';
import { Global } from '../../../../hooks';
import { Currency, Ethwei, Percentage } from '../../../../resources';
import { IContractService, NumberService } from '../../../../services';
import { IStore, ITreasuryStore } from '../../../../stores';

import { RelativeTime } from './../../../../resources/value-converters/relative-time';
import { Overview } from './overview';

import { describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';

describe('overview', () => {
  it('should have a k-page component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelectorAll('k-page')).exist;
  });

  it('should have a tile and description in the k-page component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .deps(...getRegistrations())
      .build().started;
    const kPage = appHost.querySelectorAll('k-page');
    expect(kPage[0].hasAttribute('title')).true;
    expect(kPage[0].hasAttribute('description')).true;
  });

  it('should have a token info card component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelectorAll('token-info-card')).exist;
  });

  it('should have a value card component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelectorAll('value-card')).exist;
  });

  it('should have a value by asset type card component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelectorAll('value-by-asset-type-card')).exist;
  });

  it('should have a value over time card component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelectorAll('value-over-time-card')).exist;
  });

  it('should have an assets card component', async () => {
    const { appHost } = await createFixture
      .html(`<overview>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelectorAll('assets-card')).exist;
  });

  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockContractService = () => Registration.instance(IContractService, mock<IContractService>({}));
    const createMockTreasuryStoreRegistration = () =>
      Registration.instance(
        ITreasuryStore,
        mock<ITreasuryStore>({
          getValueOverTime: () => new Promise((res) => res([])),
        }),
      );
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
        nf: (s: string) => String(s),
      });
    const designSystemConfiguration = () => Registration.instance(IDesignSystemConfiguration, {});
    return [
      Registration.instance(IPlatform, PLATFORM),
      Currency,
      Overview,
      Ethwei,
      RelativeTime,
      Percentage,
      NumberService,
      Global,
      createMockTreasuryStoreRegistration(),
      createMockContractService(),
      createMockStoreRegistration(),
      createMockI18nRegistration(),
      designSystemConfiguration(),
    ];
  }
});
