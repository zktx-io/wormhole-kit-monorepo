import { serializeTx as aptos } from './aptos/serializeTx';
import { serializeTx as evm } from './evm/serializeTx';
import { serializeTx as solana } from './solana/serializeTx';
import { serializeTx as sui } from './sui/serializeTx';
import { EVMs, SOLANAs } from '../loader/utils';

import type { Chain, Network } from '@wormhole-foundation/sdk-base';
import type { Wormhole } from '@wormhole-foundation/sdk-connect';
import type { UnsignedTransaction } from '@wormhole-foundation/sdk-definitions';

export const serializeTx = async (
  chain: Chain,
  sender: string,
  wh: Wormhole<Network> | undefined,
  txs: AsyncGenerator<UnsignedTransaction>,
): Promise<string> => {
  try {
    switch (chain) {
      case 'Algorand':
        // TODO
        break;
      case 'Aptos':
        return aptos(txs);
      case 'Sui':
        return sui(txs, sender);
      default:
        if (EVMs.includes(chain)) {
          return evm(txs);
        }
        if (SOLANAs.includes(chain)) {
          return solana(txs, wh, chain as any);
        }
        break;
    }
    throw new Error(`${chain} is not support`);
  } catch (error) {
    throw new Error(`serializeTx : ${error}`);
  }
};
