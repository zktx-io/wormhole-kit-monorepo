import { UniversalAddress } from '@wormhole-foundation/sdk-connect';

import type { IUniversalAccount } from '../types';

export const getUniversalAddress = (
  account: IUniversalAccount,
): UniversalAddress => {
  try {
    switch (account.chain) {
      case 'Aptos':
      case 'Sui':
      case 'Ethereum':
      case 'Celo':
        // TODO
        return new UniversalAddress(account.address, 'hex');
      case 'Solana':
        return new UniversalAddress(account.address, 'base58');
      default:
        break;
    }
    throw new Error(`${account.chain} is not support`);
  } catch (error) {
    throw new Error(`getUniversalAddress : ${error}`);
  }
};
