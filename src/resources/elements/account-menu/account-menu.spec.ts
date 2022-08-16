import '../../../utils-testing/setup-testing';
import { AccountMenu } from './account-menu';
import { Global } from '../../../hooks';
import { I18N } from '@aurelia/i18n';
import { IStore } from '../../../stores';
import { Registration } from 'aurelia';
import { SmallHexStringValueConverter } from '../../value-converters';
import { createFixture } from '@aurelia/testing';
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
    const createMockI18nRegistration = () => Registration.instance(I18N, {});
    return [AccountMenu, SmallHexStringValueConverter, Global, createMockStoreRegistration(), createMockI18nRegistration()];
  }
});
