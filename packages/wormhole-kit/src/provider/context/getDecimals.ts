import { decimals } from '@wormhole-foundation/sdk-base';

import { getTokenInfo } from '../tokens';

import type { Chain, Network } from '@wormhole-foundation/sdk-base';

export const getDecimals = (
  chain: Chain,
  network: Network,
  token?: string,
): number => {
  try {
    if (token) {
      return getTokenInfo(chain, network, token).decimals; // TEMP
    } else {
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
      throw new Error(`getDecimals : ${chain} is not support`);
    }
  } catch (error) {
    throw new Error(`getDecimals : ${error}`);
  }
};
