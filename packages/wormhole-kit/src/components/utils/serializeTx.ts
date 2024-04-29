import type {
  Chain,
  UnsignedTransaction,
} from '@wormhole-foundation/sdk-connect';

export const serializeTx = async (
  chain: Chain,
  sender: string,
  txs: AsyncGenerator<UnsignedTransaction>,
): Promise<string> => {
  try {
    switch (chain) {
      case 'Aptos':
        break;
      case 'Sui':
        break;
      default:
        break;
    }
    throw new Error(`${chain} is not support chain`);
  } catch (error) {
    throw new Error(`serializeTx : ${error}`);
  }
};
