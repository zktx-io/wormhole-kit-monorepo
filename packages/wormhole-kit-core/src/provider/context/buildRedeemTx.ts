import { getUniversalAddress } from './getUniversalAddress';
import { serializeTx } from './serializeTx';

import type { IReqRedeemTx, IResTransaction } from '../types';
import type { Network, Wormhole } from '@wormhole-foundation/sdk-connect';
import type { VAA } from '@wormhole-foundation/sdk-definitions';

export const buildRedeemTx = async (
  wh: Wormhole<Network> | undefined,
  req: IReqRedeemTx,
): Promise<IResTransaction> => {
  try {
    if (wh && req.source !== req.receiver.chain) {
      const snd = wh.getChain(req.source);
      const [whm] = await snd.parseTransaction(req.txHash);
      const vaa = (await wh.getVaa(
        whm!,
        'TokenBridge:Transfer',
        60_000,
      )) as VAA<'TokenBridge:Transfer'>;
      const rcv = wh.getChain(req.receiver.chain);
      const rcvTb = await rcv.getTokenBridge();

      const isTransferCompleted = await rcvTb.isTransferCompleted(vaa);
      if (isTransferCompleted) {
        return {
          error: 'These tokens have already been redeemed.',
          unsignedTxs: [],
        };
      }

      const redeem = rcvTb.redeem(getUniversalAddress(req.receiver), vaa!);
      const unsignedTxs = await serializeTx(req.source, redeem);
      return {
        unsignedTxs,
      };
    }
    return {
      error: 'Source and Target chains must be different.',
      unsignedTxs: [],
    };
  } catch (error) {
    return {
      error: `${error}`,
      unsignedTxs: [],
    };
  }
};
