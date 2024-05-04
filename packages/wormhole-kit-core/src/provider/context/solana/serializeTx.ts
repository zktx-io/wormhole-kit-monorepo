import { type Network, type Wormhole } from '@wormhole-foundation/sdk-connect';
import { SolanaPlatform } from '@wormhole-foundation/sdk-solana';

import type { UnsignedTransaction } from '@wormhole-foundation/sdk-definitions';

export const serializeTx = async (
  txs: AsyncGenerator<UnsignedTransaction>,
  wh: Wormhole<Network> | undefined,
  chain: 'Solana' | 'Pythnet',
): Promise<string> => {
  try {
    if (wh) {
      for await (const {
        transaction: { transaction },
      } of txs) {
        const platform = wh.getPlatform('Solana');
        const { blockhash: recentBlockhash } = await SolanaPlatform.latestBlock(
          platform.getRpc(chain),
        );
        transaction.recentBlockhash = recentBlockhash;
        return `0x${Buffer.from(transaction.compileMessage().serialize()).toString('hex')}`;
      }
      throw new Error('multi transactions are not support');
    }
    throw new Error('wormhole error');
  } catch (error) {
    throw new Error(`${error}`);
  }
};
