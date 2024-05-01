import { decimals } from '@wormhole-foundation/sdk-base';

import type { Chain } from '@wormhole-foundation/sdk-base';

export const getNativeDecimals = (chain: Chain): number => {
  try {
    switch (chain) {
      case 'Algorand':
      case 'Aptos':
      case 'Near':
      case 'Btc':
      case 'Solana':
      case 'Sui':
        return decimals.nativeDecimals(chain);
      case 'Ethereum':
      case 'Celo':
      case 'Klaytn':
        // TODO
        return decimals.nativeDecimals('Evm');
      default:
        break;
    }
    throw new Error(`${chain} is not support`);
  } catch (error) {
    throw new Error(`getNativeDecimals : ${error}`);
  }
};
