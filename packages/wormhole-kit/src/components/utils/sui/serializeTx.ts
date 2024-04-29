import type { UnsignedTransaction } from '@wormhole-foundation/sdk-connect';

export const serializeTx = async (
  sender: string,
  txs: AsyncGenerator<UnsignedTransaction>,
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
