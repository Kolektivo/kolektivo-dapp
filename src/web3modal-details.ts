import { IConfiguration } from './configurations/configuration';
import { IWalletConnector } from './wallet-connector';

import { Web3Provider } from '@ethersproject/providers/lib';
import type Web3Modal from 'web3modal';
import { type IWalletConnectConnectorOptions } from 'web3modal/dist/providers/connectors/walletconnect';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ConnectToWalletConnect = (walletConnectProvider: any, opts?: IWalletConnectConnectorOptions, targetedChainId?: number): Promise<unknown> => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    let bridge = 'https://bridge.walletconnect.org';
    let qrcode = true;
    let infuraId = '';
    let rpc = undefined;
    let chainId = 1;
    let qrcodeModalOptions = undefined;

    if (opts) {
      bridge = opts.bridge ?? bridge;
      qrcode = typeof opts.qrcode !== 'undefined' ? opts.qrcode : qrcode;
      infuraId = opts.infuraId ?? '';
      rpc = opts.rpc ?? undefined;
      chainId = opts.network && targetedChainId ? targetedChainId : 1;
      qrcodeModalOptions = opts.qrcodeModalOptions ?? undefined;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const provider = new walletConnectProvider({
      bridge,
      qrcode,
      infuraId,
      rpc,
      chainId,
      qrcodeModalOptions,
    });
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      await provider.enable();
      resolve(provider);
    } catch (e) {
      reject(e);
    }
  });
};

export const getWeb3ModalInstance = async (configuration: IConfiguration) => {
  const chainId = configuration.chainId;
  if (!chainId) {
    throw new Error('Chain id is not found');
  }

  return new (await import('web3modal')).default({
    cacheProvider: false,
    providerOptions: {
      'custom-kolektivo': {
        display: {
          logo: 'data:image/gif;base64,R0lGODlhyADIAMIAAP/yAAoKCgAAAcRiAO0cJAAAAAAAAAAAACH5BAEAAAUALAAAAADIAMgAAAP+WLrc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5eaTAukCzOrry+3s6sjtAfUB8MP09vjC+vX8wfzdk/dLoL2B6YAZ3EfQ18J/DXs9ROjOobqDBwGSmHj+ENJEjSM42vN4ESPEhCdE1iOZzuTJiiVUBmApwCVFEO3aAdjJs+fOjo8+RuSQU53PowCAOhKK0kPRdEh9Km3EFCbRp1F7TmWkEylIC12zZt26KKzPrxXMij1KVpFanmgpvF3Ls22iuQDiTsBL1y6Yp4AD28yI1evQvUbprvX7JbDjnIMZFo2q1wFfxT9HnnnMuWZkingrN7iMmbGXzo8/g058VDQD0opNZ5F5ELNtw00jwL4tGwtte7eDwz1smbVwpL2v/K53PLjo3baTW1keoPnt58at19VsRqZW4NrPEi8AXbj02SUjf2cevifa8sHP+04/eH319sNzv86OP/P+ys302WRffzu9x19/8m2BWkvg9WcgVMepBseCnrHn4Hjw2WfThAvWRuCDAjQn4RsUenihfgtkuF1kgJiIn2xmDSDjAPYx4mJ7MBo3I40rzrTIjeHlCOFOO9b4Y4MvcqebjjMaqYiLoR2YlJIQtLPjlTMmqAeUUuIlpABYYqllHlwOKZ6ZTi6ZTphXjolHmSHiFidbVD5gJZtZ1mnIQQT0ScBtfv7ZI4V3iqlnIXz6CaiigxK6Zphu3pFon4tS2qijbEZqx6SCYhaofY4+auh/jgCpXZE8oSqWpn2Yap2qAMAaFat8uNocrLIid6iNSLaHa5OL7fqIarf9KmNfwpaK+lmxwBLZ7FjJNkKsbcbyuGq0vKpH7bO50klqJ7YSmCYn4Yrrn4+elGsurYeoKy67e/ZqrrfogivvvONu4i6B8CJ6L77nguKigD0O7FK+mhhskoZIEhzwJwpjxLCFUy7co8ANH1xwxhY/LIpdIB/qmr6Hhvztfih+XPLKJ6c4HsYtK2ByvShb9UQCADs=',
          name: 'Koletivo Wallet',
          description: 'Connect to your Kolektivo Wallet',
        },
        package: (await import('@walletconnect/web3-provider')).default,
        options: {
          // apiKey: 'EXAMPLE_PROVIDER_API_KEY',
          rpc: {
            [chainId]: configuration.chain.toLowerCase(),
          },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        connector: (walletConnectProvider: any, opts?: IWalletConnectConnectorOptions) => ConnectToWalletConnect(walletConnectProvider, opts, chainId),
      },
      // TODO: test with walletconnect
      walletconnect: {
        package: (await import('@walletconnect/web3-provider')).default, // required
        options: {
          rpc: {
            [chainId]: configuration.chain.toLowerCase(),
          },
        },
      },
    }, // required
    theme: 'dark',
  });
};

export class Web3ModalConnect implements IWalletConnector {
  instance?: Web3Modal;
  constructor(@IConfiguration private readonly configuration: IConfiguration) {}

  async connect() {
    this.instance ??= await getWeb3ModalInstance(this.configuration);
    return (await this.instance.connect()) as Web3Provider;
  }
  async connectTo(name: string) {
    this.instance ??= await getWeb3ModalInstance(this.configuration);
    return (await this.instance.connectTo(name)) as Web3Provider;
  }
}
