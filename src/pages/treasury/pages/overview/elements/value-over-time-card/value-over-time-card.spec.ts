import { Global } from '../../../../../../hooks';
import { I18N } from '@aurelia/i18n';
import { IDesignSystemConfiguration } from '../../../../../../../design-system/configuration';
import { IStore } from '../../../../../../stores';
import { Registration } from 'aurelia';
import { ValueOverTimeCard } from './value-over-time-card';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it } from 'vitest';
import { preparePlatform } from '../../../../../../utils-testing/setup-testing';

preparePlatform();

describe('value-over-time-card', () => {
  it('should have a k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<value-over-time-card>`)
      .component({})
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('#t-o-votc-card')).exist;
  });
  it('should have a title k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<value-over-time-card>`)
      .component({})
      .deps(...getRegistrations())
      .build().started;
    const card = appHost.querySelector('#t-o-votc-card');
    expect(card?.getAttribute('title')).exist;
  });
  it('should have a chart time filter component with text on the right', async () => {
    const { appHost } = await createFixture
      .html(`<value-over-time-card>`)
      .component({})
      .deps(...getRegistrations())
      .build().started;
    const filter = appHost.querySelector('chart-time-filter');
    expect(filter).exist;
    expect(filter?.innerHTML).contains('k-text');
  });
  it('should have a line chart', async () => {
    const { appHost } = await createFixture
      .html(`<value-over-time-card>`)
      .component({})
      .deps(...getRegistrations())
      .build().started;
    const chart = appHost.querySelector('k-chart');
    expect(chart).exist;
  });
  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: () => 'Overview',
      });
    const designSystemConfiguration = () => Registration.instance(IDesignSystemConfiguration, {});
    return [ValueOverTimeCard, Global, createMockStoreRegistration(), createMockI18nRegistration(), designSystemConfiguration()];
  }
});
