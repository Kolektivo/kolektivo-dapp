import { AccountMenu } from './account-menu';
import { Global } from '../../../hooks';
import { I18N } from '@aurelia/i18n';
import { IStore } from '../../../stores';
import { Registration } from 'aurelia';
import { SmallHexStringValueConverter } from '../../value-converters';
import { createFixture } from '@aurelia/testing';
import { describe, expect, it } from 'vitest';
import { preparePlatform } from '../../../utils-testing/setup-testing';

preparePlatform();

describe('<account-menu />', () => {
  it('displays store connected wallet address', async () => {
    // todo: what is this rule about?
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { appHost } = await createFixture
      .html(`<account-menu>`)
      .component({})
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
