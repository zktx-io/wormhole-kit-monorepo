import type { Chain, UnsignedTransaction } from '@wormhole-foundation/sdk';

export const serializeTx = async (
  chain: Chain,
  sender: string,
  txs: AsyncGenerator<UnsignedTransaction>,
): Promise<string> => {
  switch (chain) {
    case 'Aptos':
      break;
    case 'Sui':
      break;
    default:
      break;
  }
  throw new Error('serializeTx error');
};
