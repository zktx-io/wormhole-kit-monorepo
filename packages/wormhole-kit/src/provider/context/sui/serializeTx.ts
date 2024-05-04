import type { UnsignedTransaction } from '@wormhole-foundation/sdk-definitions';

export const serializeTx = async (
  txs: AsyncGenerator<UnsignedTransaction>,
  sender: string,
): Promise<string> => {
  try {
    const unsignedTx: string[] = [];
    for await (const tx of txs) {
      tx.transaction.setSender(sender);
      unsignedTx.push(tx.transaction.serialize());
    }
    if (unsignedTx.length === 1) {
      return unsignedTx[0];
    }
    throw new Error('multi transactions are not support');
  } catch (error) {
    throw new Error(`${error}`);
  }
};
