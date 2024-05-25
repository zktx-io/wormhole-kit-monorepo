import { serializeTx as aptos } from './aptos/serializeTx';

import type { IUnsignedTx } from '../types';
import type { Chain, Network } from '@wormhole-foundation/sdk-connect';
import type { UnsignedTransaction } from '@wormhole-foundation/sdk-definitions';

export const serializeTx = async (
  chain: Chain,
  txs: AsyncGenerator<UnsignedTransaction<Network, Chain>>,
): Promise<Array<IUnsignedTx>> => {
  try {
    const unsignedTxs: UnsignedTransaction<Network, Chain>[] = [];
    for await (const tx of txs) {
      unsignedTxs.push(tx);
    }
    if (chain === 'Aptos') {
      return unsignedTxs.map((tx) => aptos(tx).transaction);
    }
    return unsignedTxs.map(({ transaction }) => transaction);
  } catch (error) {
    throw new Error(`serializeTx : ${error}`);
  }
};
