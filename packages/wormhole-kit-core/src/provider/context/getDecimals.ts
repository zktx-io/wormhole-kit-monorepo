import { decimals } from '@wormhole-foundation/sdk-base';

import { EVMs, SOLANAs } from '../loader/utils';
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
        default:
          if (EVMs.includes(chain)) {
            return decimals.nativeDecimals('Evm');
          }
          if (SOLANAs.includes(chain)) {
            return decimals.nativeDecimals('Solana');
          }
          break;
      }
      throw new Error(`getDecimals : ${chain} is not support`);
    }
  } catch (error) {
    throw new Error(`getDecimals : ${error}`);
  }
};
