import { serializeTx as aptos } from './aptos/serializeTx';
import { serializeTx as sui } from './sui/serializeTx';

import type { Chain } from '@wormhole-foundation/sdk-base';
import type { UnsignedTransaction } from '@wormhole-foundation/sdk-definitions';

export const serializeTx = async (
  chain: Chain,
  sender: string,
  txs: AsyncGenerator<UnsignedTransaction>,
): Promise<string> => {
  try {
    switch (chain) {
      case 'Aptos':
        return aptos(sender, txs);
      case 'Sui':
        return sui(sender, txs);
      default:
        break;
    }
    throw new Error(`${chain} is not support`);
  } catch (error) {
    throw new Error(`serializeTx : ${error}`);
  }
};
