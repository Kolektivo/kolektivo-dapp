import '../../../../../../utils-testing/setup-testing';
import { Global } from '../../../../../../hooks';
import { I18N } from '@aurelia/i18n';
import { INumberService } from './../../../../../../services/NumberService';
import { IStore } from '../../../../../../stores';
import { PercentageValueConverter } from './../../../../../../resources/value-converters/percentage';
import { Registration } from 'aurelia';
import { SupplyCard } from './supply-card';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it } from 'vitest';

describe('supply-card', () => {
  it('should have a k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<supply-card>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('k-card')).exist;
  });

  it('should have a title and tooltip in the k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<supply-card>`)
      .deps(...getRegistrations())
      .build().started;
    const card = appHost.querySelector('k-card');
    expect(card?.getAttribute('title')).exist;
    expect(card?.getAttribute('tooltip-text')).exist;
  });

  it('should have a chart time filter component with 4 legends on the right', async () => {
    const { appHost } = await createFixture
      .html(`<supply-card>`)
      .deps(...getRegistrations())
      .build().started;
    const filter = appHost.querySelector('chart-time-filter');
    expect(filter).exist;
    expect(filter?.querySelectorAll('avatar-text')).toHaveLength(4);
  });

  it('should have a line chart', async () => {
    const { appHost } = await createFixture
      .html(`<supply-card>`)
      .deps(...getRegistrations())
      .build().started;
    const chart = appHost.querySelector('k-chart');
    expect(chart).exist;
  });

  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
      });
    const numberServiceRegistration = () => Registration.instance(INumberService, {});
    return [SupplyCard, PercentageValueConverter, Global, createMockStoreRegistration(), createMockI18nRegistration(), numberServiceRegistration()];
  }
});