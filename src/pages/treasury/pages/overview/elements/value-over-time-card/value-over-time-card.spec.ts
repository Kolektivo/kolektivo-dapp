import '../../../../../../utils-testing/setup-testing';
import { Global } from '../../../../../../hooks';
import { I18N } from '@aurelia/i18n';
import { IDesignSystemConfiguration } from '../../../../../../design-system/configuration';
import { IStore, ITreasuryStore } from '../../../../../../stores';
import { Registration } from 'aurelia';
import { RelativeTime } from './../../../../../../resources/value-converters/relative-time';
import { ValueOverTimeCard } from './value-over-time-card';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';

describe('value-over-time-card', () => {
  it('should have a k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<value-over-time-card>`)
      .deps(...getRegistrations())
      .build().started;
    expect(appHost.querySelector('k-card')).exist;
  });

  it('should have a title k-card component', async () => {
    const { appHost } = await createFixture
      .html(`<value-over-time-card>`)
      .deps(...getRegistrations())
      .build().started;
    const card = appHost.querySelector('k-card');
    expect(card?.getAttribute('title')).exist;
  });

  it('should have a chart time filter component with text on the right', async () => {
    const { appHost } = await createFixture
      .html(`<value-over-time-card>`)
      .deps(...getRegistrations())
      .build().started;
    const filter = appHost.querySelector('chart-time-filter');
    expect(filter).exist;
    expect(filter?.innerHTML).contains('k-text');
  });

  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
      });
    const designSystemConfiguration = () => Registration.instance(IDesignSystemConfiguration, {});
    return [
      ValueOverTimeCard,
      RelativeTime,
      Global,
      Registration.instance(
        ITreasuryStore,
        mock<ITreasuryStore>({
          getValueOverTime: (x) => {
            return new Promise((res) => res([]));
          },
        }),
      ),
      createMockStoreRegistration(),
      createMockI18nRegistration(),
      designSystemConfiguration(),
    ];
  }
});
