import { Registration } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { createFixture } from '@aurelia/testing';

import '../../../utils-testing/setup-testing';

import { Global } from '../../../hooks';
import { IStore } from '../../../stores';
import { SmallHexString } from '../../value-converters';

import { AccountMenu } from './account-menu';

import { describe, expect, it } from 'vitest';

describe('<account-menu />', () => {
  it('displays store connected wallet address', async () => {
    const { appHost } = await createFixture
      .html(`<account-menu>`)
      .deps(...getRegistrations())
      .build().started;

    expect(appHost.textContent).toContain('ABXX');
  });

  function getRegistrations(overrides?: Partial<IStore>) {
    const createMockStoreRegistration = () =>
      Registration.instance(IStore, {
        blockChainStore: {
          connectedWalletAddress: 'ABXX',
        },
        ...overrides,
      });
    const createMockI18nRegistration = () =>
      Registration.instance(I18N, {
        tr: (s: string) => String(s),
      });
    return [AccountMenu, SmallHexString, Global, createMockStoreRegistration(), createMockI18nRegistration()];
  }
});
