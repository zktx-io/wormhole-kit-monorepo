import { decimals } from '@wormhole-foundation/sdk-base';

import { getTokenInfo } from '../tokens';

import type { Chain, Network } from '@wormhole-foundation/sdk-base';
import type { Wormhole } from '@wormhole-foundation/sdk-connect';

export const getDecimals = (
  wh: Wormhole<Network> | undefined,
  chain: Chain,
  token?: string,
): number => {
  try {
    if (token) {
      if (wh) {
        return getTokenInfo(chain, wh.network, token).decimals;
      }
      throw new Error(`getDecimals : ${chain}:${token} is not support`);
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
