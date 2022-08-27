import 'utils-testing/setup-testing';
import { BlockChainStore, IStore, ITreasuryStore, TreasuryStore } from 'stores';
import { BrowserStorageService, IContractsService, IEthereumService, ITokenService, NumberService } from 'services';
import { CurrencyValueConverter, EthweiValueConverter, PercentageValueConverter } from 'resources';
import { Global } from 'hooks';
import { I18N } from '@aurelia/i18n';
import { IDesignSystemConfiguration } from 'design-system';
import { Registration } from 'aurelia';
import { TokenInfoCard } from './token-info-card';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it, vi } from 'vitest';
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
    const createMockContractsService = () => Registration.instance(IContractsService, mock<IContractsService>({}));

    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
        nf: (s: string) => String(s),
      });
    const designSystemConfiguration = () => Registration.instance(IDesignSystemConfiguration, {});
    return [
      TokenInfoCard,
      CurrencyValueConverter,
      TreasuryStore,
      Registration.instance(ITokenService, vi.fn()),
      createMockContractsService(),
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
