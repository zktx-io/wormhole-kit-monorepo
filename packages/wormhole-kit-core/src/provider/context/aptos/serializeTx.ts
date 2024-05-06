import type {
  Chain,
  Network,
  UnsignedTransaction,
} from '@wormhole-foundation/sdk-connect';

export const serializeTx = (
  tx: UnsignedTransaction<Network, Chain>,
): UnsignedTransaction<Network, Chain> => {
  if (tx.transaction.arguments) {
    tx.transaction.arguments = tx.transaction.arguments.map((a: any) =>
      a instanceof Uint8Array
        ? Array.from(a)
        : typeof a === 'bigint'
          ? a.toString()
          : a,
    );
  }
  return tx;
};
