import '../../../../../../utils-testing/setup-testing';
import { CurrencyValueConverter } from '../../../../../../../design-system/value-converters';
import { Global } from '../../../../../../hooks';
import { I18N } from '@aurelia/i18n';
import { IDesignSystemConfiguration } from '../../../../../../../design-system/configuration';
import { IStore } from '../../../../../../stores';
import { Registration } from 'aurelia';
import { TokenInfoCard } from './token-info-card';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it } from 'vitest';

describe('token-info-card', () => {
  it('should have a k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<token-info-card>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('#t-o-tic-card')).exist;
  });

  it('should have a color, title and avatar on the k-card', async () => {
    const { appHost } = await createFixture
      .html(`<token-info-card>`)
      .deps(...getRegistrations())
      .build().started;
    const kCard = appHost.querySelector('#t-o-tic-card');
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
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
      });
    const designSystemConfiguration = () => Registration.instance(IDesignSystemConfiguration, {});
    return [TokenInfoCard, CurrencyValueConverter, Global, createMockStoreRegistration(), createMockI18nRegistration(), designSystemConfiguration()];
  }
});
