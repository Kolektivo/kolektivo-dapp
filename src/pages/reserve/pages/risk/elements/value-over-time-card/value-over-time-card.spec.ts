import { Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { createFixture } from '@aurelia/testing';

import '../../../../../../utils-testing/setup-testing';

import { IDesignSystemConfiguration } from '../../../../../../design-system/configuration';
import { Global } from '../../../../../../hooks';
import { IStore } from '../../../../../../stores';

import { ValueOverTimeCard } from './value-over-time-card';

import { Interval } from 'models/interval';
import { IReserveStore } from 'stores/reserve-store';
import { describe, expect, it } from 'vitest';
import { mockDeep } from 'vitest-mock-extended';
const reserveMock = mockDeep<IReserveStore>();
describe('value-over-time-card', () => {
  reserveMock.getRiskOverTime.calledWith(Interval['1d']).mockResolvedValue([]);
  it('should have a k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<value-over-time-card>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('k-card')).exist;
  });

  it('should have a title and tooltip in the k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<value-over-time-card>`)
      .deps(...getRegistrations())
      .build().started;
    const card = appHost.querySelector('k-card');
    expect(card?.getAttribute('title')).exist;
    expect(card?.getAttribute('tooltip-text')).exist;
  });

  it('should have a chart time filter component with four legends on the right', async () => {
    const { appHost } = await createFixture
      .html(`<value-over-time-card>`)
      .deps(...getRegistrations())
      .build().started;
    const filter = appHost.querySelector('chart-time-filter');
    expect(filter).exist;
    expect(filter?.querySelectorAll('avatar-text')).toHaveLength(5);
  });

  it('should have a line chart', async () => {
    const { appHost } = await createFixture
      .html(`<value-over-time-card>`)
      .deps(...getRegistrations())
      .build().started;
    const chart = appHost.querySelector('k-chart');
    expect(reserveMock.reserveValue?.eq).toHaveBeenCalled();
    expect(chart).exist;
  });

  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
      });
    const designSystemConfiguration = () => Registration.instance(IDesignSystemConfiguration, {});
    return [ValueOverTimeCard, Global, Registration.instance(IReserveStore, reserveMock), createMockStoreRegistration(), createMockI18nRegistration(), designSystemConfiguration()];
  }
});
