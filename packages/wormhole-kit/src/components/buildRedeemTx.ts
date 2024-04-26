import type { IReqRedeemTx } from './types';
import type { Wormhole } from '@wormhole-foundation/sdk/dist/cjs';

export const buildRedeemTx = async (
  wh: Wormhole<'Mainnet' | 'Testnet' | 'Devnet'>,
  req: IReqRedeemTx,
): Promise<string> => {
  throw new Error();
};
