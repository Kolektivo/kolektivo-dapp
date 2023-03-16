import { Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { createFixture } from '@aurelia/testing';

import 'utils-testing/setup-testing';

import { IDesignSystemConfiguration } from '../../../../../../design-system';
import { Global } from '../../../../../../hooks';
import { CurrencyValueConverter, EthweiValueConverter, PercentageValueConverter } from '../../../../../../resources';
import { BrowserStorageService, IContractService, IEthereumService, NumberService } from '../../../../../../services';
import { BlockChainStore, IStore, ITreasuryStore } from '../../../../../../stores';

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
    expect(kCard?.hasAttribute('title-avatar')).true;
  });

  it('should have a 3 col k-grid with three labels and tooltips', async () => {
    const { appHost } = await createFixture
      .html(`<token-info-card>`)
      .deps(...getRegistrations())
      .build().started;
    const kGrid = appHost.querySelector('#t-o-tic-stats');
    expect(kGrid?.getAttribute('cols')).eq('3');
    const labels = kGrid?.querySelectorAll('label-value');
    expect(labels).toHaveLength(3);
    labels?.forEach((label) => expect(label.getAttribute('tooltip-text')).exist);
  });

  it('should have supply distribution with tooltip and 3 treasury percentages', async () => {
    const { appHost } = await createFixture
      .html(`<token-info-card>`)
      .deps(...getRegistrations())
      .build().started;
    const supplyDistribution = appHost.querySelector('#t-o-tic-supply');
    expect(supplyDistribution?.getAttribute('tooltip-text')).exist;
    const stats = supplyDistribution?.querySelectorAll('k-text');
    expect(stats).toHaveLength(3);
  });

  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockTreasuryStoreRegistration = () => Registration.instance(ITreasuryStore, {});
    const createMockEthereumService = () => Registration.instance(IEthereumService, mock<IEthereumService>({}));
    const createMockContractService = () => Registration.instance(IContractService, mock<IContractService>({}));

    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
        nf: (s: string) => String(s),
      });
    const designSystemConfiguration = () => Registration.instance(IDesignSystemConfiguration, {});
    return [
      TokenInfoCard,
      CurrencyValueConverter,
      createMockContractService(),
      createMockEthereumService(),
      BrowserStorageService,
      BlockChainStore,
      PercentageValueConverter,
      EthweiValueConverter,
      NumberService,
      Global,
      createMockStoreRegistration(),
      createMockTreasuryStoreRegistration(),
      createMockI18nRegistration(),
      designSystemConfiguration(),
    ];
  }
});
