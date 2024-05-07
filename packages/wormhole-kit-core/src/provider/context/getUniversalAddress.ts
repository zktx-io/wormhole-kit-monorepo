import { UniversalAddress } from '@wormhole-foundation/sdk-definitions';

import { EVMs } from '../loader/utils';

import type { IUniversalAccount } from '../types';

export const getUniversalAddress = (
  account: IUniversalAccount,
): UniversalAddress => {
  try {
    switch (account.chain) {
      case 'Aptos':
      case 'Sui':
        return new UniversalAddress(account.address, 'hex');
      default:
        if (EVMs.includes(account.chain)) {
          return new UniversalAddress(account.address, 'hex');
        }
        break;
    }
    throw new Error(`${account.chain} is not support`);
  } catch (error) {
    throw new Error(`getUniversalAddress : ${error}`);
  }
};
