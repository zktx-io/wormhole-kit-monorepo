import type { Chain, Network } from '@wormhole-foundation/sdk-connect';
import type { UnsignedTransaction } from '@wormhole-foundation/sdk-definitions';

export const serializeTx = async (
  txs: AsyncGenerator<UnsignedTransaction<Network, Chain>>,
): Promise<any> => {
  try {
    const unsignedTx: UnsignedTransaction<Network, Chain>[] = [];
    for await (const tx of txs) {
      unsignedTx.push(tx);
    }
    if (unsignedTx.length === 1) {
      return unsignedTx[0].transaction;
    }
    throw new Error('multi transactions are not support');
  } catch (error) {
    throw new Error(`serializeTx : ${error}`);
  }
};
