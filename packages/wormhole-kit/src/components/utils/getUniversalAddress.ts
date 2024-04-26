import { UniversalAddress } from '@wormhole-foundation/sdk';

import type { IUniversalAccount } from '../types';

export const getUniversalAddress = (
  account: IUniversalAccount,
): UniversalAddress => {
  switch (account.chain) {
    case 'Aptos':
    case 'Sui':
    case 'Ethereum':
    case 'Celo':
      return new UniversalAddress(account.address, 'hex');
    default:
      break;
  }
  throw new Error(`not support chain (${account.chain})`);
};
