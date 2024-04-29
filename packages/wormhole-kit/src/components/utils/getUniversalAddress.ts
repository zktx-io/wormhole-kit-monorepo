import { UniversalAddress } from '@wormhole-foundation/sdk-connect';

import type { IUniversalAccount } from '../types';

export const getUniversalAddress = (
  account: IUniversalAccount,
): UniversalAddress => {
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
  throw new Error(`not support chain (${account.chain})`);
};
