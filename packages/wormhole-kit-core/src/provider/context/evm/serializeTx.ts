import type { UnsignedTransaction } from '@wormhole-foundation/sdk-definitions';

export const serializeTx = async (
  txs: AsyncGenerator<UnsignedTransaction>,
): Promise<string> => {
  try {
    const unsignedTx: {
      chainId: bigint;
      from: string;
      to: string;
      value: bigint;
      data: string;
    }[] = [];
    for await (const tx of txs) {
      unsignedTx.push({
        ...tx.transaction,
        chainId: `0x${(tx.transaction.chainId as bigint).toString(16)}`,
        value: `0x${(tx.transaction.value as bigint).toString(16)}`,
      });
    }
    throw new Error('multi transactions are not support');
  } catch (error) {
    throw new Error(`${error}`);
  }
};
