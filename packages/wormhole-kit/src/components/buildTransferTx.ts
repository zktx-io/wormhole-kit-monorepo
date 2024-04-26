import type { IReqTransferTx } from './types';
import type { Wormhole } from '@wormhole-foundation/sdk/dist/cjs';

export const buildTransferTx = async (
  wh: Wormhole<'Mainnet' | 'Testnet' | 'Devnet'>,
  req: IReqTransferTx,
): Promise<string> => {
  throw new Error();
};
