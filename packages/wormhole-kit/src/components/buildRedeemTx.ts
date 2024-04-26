import { serializeTx } from './serializeTx';
import { getUniversalAddress } from './utils/getUniversalAddress';

import type { IReqRedeemTx } from './types';
import type { Wormhole } from '@wormhole-foundation/sdk/dist/cjs';

export const buildRedeemTx = async (
  wh: Wormhole<'Mainnet' | 'Testnet' | 'Devnet'>,
  req: IReqRedeemTx,
): Promise<string> => {
  try {
    const ctx = wh.getChain(req.source);
    const [whm] = await ctx.parseTransaction(req.txHash);
    const vaa = await wh.getVaa(whm!, 'TokenBridge:Transfer', 60_000);
    const rcv = wh.getChain(req.receiver.chain);
    const rcvTb = await rcv.getTokenBridge();
    const redeem = rcvTb.redeem(getUniversalAddress(req.receiver), vaa!);
    return serializeTx(req.receiver.chain, req.receiver.address, redeem);
  } catch (error) {
    throw new Error(`${error}`);
  }
};
