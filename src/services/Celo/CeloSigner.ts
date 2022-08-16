/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BigNumber, Signer, providers, utils } from 'ethers';
import { CeloTransactionRequest, serializeCeloTransaction } from './transactions';
// import type { CeloProvider } from './CeloProvider';

const logger = new utils.Logger('CeloWallet');

const forwardErrors = [utils.Logger.errors.INSUFFICIENT_FUNDS, utils.Logger.errors.NONCE_EXPIRED, utils.Logger.errors.REPLACEMENT_UNDERPRICED];

export class CeloSigner {
  private readonly signer: Signer;

  /**
   * Signer
   * @param signer
   */
  constructor(signer: Signer) {
    this.signer = signer;
  }

  /**
   * Override to skip checkTransaction step which rejects Celo tx properties
   * https://github.com/ethers-io/ethers.js/blob/master/packages/abstract-signer/src.ts/index.ts
   */
  async populateTransaction(transaction: utils.Deferrable<CeloTransactionRequest>): Promise<any> {
    const tx: any = await utils.resolveProperties(transaction);

    if (tx.to != null) {
      tx.to = Promise.resolve(tx.to).then((to) => this.signer.resolveName(to));
    }
    if (tx.gasPrice == null) {
      tx.gasPrice = this.getGasPrice();
    }
    if (tx.nonce == null) {
      tx.nonce = this.signer.getTransactionCount('pending');
    }

    if (tx.gasLimit == null) {
      tx.gasLimit = this.estimateGas(tx).catch((error) => {
        if (forwardErrors.includes(error.code)) {
          throw error;
        }

        return logger.throwError(
          'cannot estimate gas; transaction may fail or may require manual gas limit',
          utils.Logger.errors.UNPREDICTABLE_GAS_LIMIT,
          {
            error: error,
            tx: tx,
          },
        );
      });
    }

    if (tx.chainId == null) {
      tx.chainId = this.signer.getChainId();
    } else {
      tx.chainId = Promise.all([Promise.resolve(tx.chainId), this.signer.getChainId()]).then((results) => {
        if (results[1] !== 0 && results[0] !== results[1]) {
          logger.throwArgumentError('chainId address mismatch', 'transaction', transaction);
        }
        return results[0];
      });
    }

    return utils.resolveProperties(tx);
  }

  /**
   * Override to serialize transaction using custom serialize method
   * https://github.com/ethers-io/ethers.js/blob/master/packages/wallet/src.ts/index.ts
   */
  async signTransaction(transaction: CeloTransactionRequest): Promise<string> {
    const tx = await this.populateTransaction(transaction);

    if (tx.from != null) {
      if (utils.getAddress(tx.from) !== (this.signer as unknown as any).address) {
        logger.throwArgumentError('transaction from address mismatch', 'transaction.from', transaction.from);
      }
      delete tx.from;
    }

    const signature = (this.signer as unknown as any)._signingKey().signDigest(utils.keccak256(serializeCeloTransaction(tx)));
    const serialized = serializeCeloTransaction(tx, signature);
    return serialized;
  }

  /**
   * Override just for type fix
   * https://github.com/ethers-io/ethers.js/blob/master/packages/wallet/src.ts/index.ts
   */
  sendTransaction(transaction: utils.Deferrable<CeloTransactionRequest>): Promise<providers.TransactionResponse> {
    return this.signer.sendTransaction(transaction);
  }

  /**
   * Override to skip checkTransaction step which rejects Celo tx properties
   * https://github.com/ethers-io/ethers.js/blob/master/packages/abstract-signer/src.ts/index.ts
   */
  async estimateGas(transaction: utils.Deferrable<CeloTransactionRequest>): Promise<BigNumber> {
    this.signer._checkProvider('estimateGas');
    const tx = await utils.resolveProperties(transaction);
    return (await this.signer.provider?.estimateGas(tx)) ?? BigNumber.from(0);
  }

  /**
   * Override to support alternative gas currencies
   * https://github.com/celo-tools/ethers.js/blob/master/packages/abstract-signer/src.ts/index.ts
   */
  async getGasPrice(feeCurrencyAddress?: string): Promise<BigNumber> {
    this.signer._checkProvider('getGasPrice');
    // @ts-expect-error
    return await this.signer.provider.getGasPrice(feeCurrencyAddress);
  }

  // connect(provider: CeloProvider): CeloWallet {
  //   return new CeloWallet(this, provider);
  // }

  // static fromMnemonic(mnemonic: string, path?: string, wordlist?: Wordlist): CeloWallet {
  //   const wallet = super.fromMnemonic(mnemonic, path, wordlist);
  //   return new CeloWallet(wallet);
  // }
}
