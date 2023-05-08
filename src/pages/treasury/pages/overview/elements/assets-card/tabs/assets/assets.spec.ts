import { Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { createFixture } from '@aurelia/testing';

import 'utils-testing/setup-testing';

import { Global } from '../../../../../../../../hooks';
import { IStore, ITreasuryStore } from '../../../../../../../../stores';

import { Assets } from './assets';

import { describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';

describe('assets', () => {
  it('should have a k-data-grid component', async () => {
    const { appHost } = await createFixture
      .html(`<assets>`)
      .deps(...getRegistrations())
      .build().started;

    expect(appHost.querySelector('k-data-grid')).exist;
  });

  function getRegistrations() {
    const createMockStoreRegistration = () => Registration.instance(IStore, {});
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
      });
    return [
      Assets,
      Global,
      createMockStoreRegistration(),
      Registration.instance(
        ITreasuryStore,
        mock<ITreasuryStore>({
          treasuryAssets: [],
          getValueOverTime: () => new Promise((res) => res([])),
        }),
      ),
      createMockI18nRegistration(),
    ];
  }
});
