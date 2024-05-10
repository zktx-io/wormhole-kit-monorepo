import { decimals } from '@wormhole-foundation/sdk-connect';
import { getTokenByAddress } from '@wormhole-foundation/sdk-connect/tokens';

import { EVMs } from '../loader/utils';

import type { Chain, Network } from '@wormhole-foundation/sdk-connect';

export const getDecimals = (
  chain: Chain,
  network: Network,
  token?: string,
): number => {
  try {
    if (token) {
      const temp = getTokenByAddress(network, chain, token);
      if (temp) {
        return temp.decimals;
      } else {
        throw new Error(`getDecimals : ${token} is unknown token`);
      }
    } else {
      switch (chain) {
        case 'Algorand':
        case 'Aptos':
        case 'Near':
        case 'Btc':
        case 'Sui':
          return decimals.nativeDecimals(chain);
        default:
          if (EVMs.includes(chain)) {
            return decimals.nativeDecimals('Evm');
          }
          break;
      }
      throw new Error(`getDecimals : ${chain} is not support`);
    }
  } catch (error) {
    throw new Error(`getDecimals : ${error}`);
  }
};
