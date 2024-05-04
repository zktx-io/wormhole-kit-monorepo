import { getUniversalAddress } from './getUniversalAddress';
import { serializeTx } from './serializeTx';

import type { IReqRedeemTx, IResTransferTx } from '../types';
import type { Network } from '@wormhole-foundation/sdk-base';
import type { Wormhole } from '@wormhole-foundation/sdk-connect';
import type { VAA } from '@wormhole-foundation/sdk-definitions';

export const buildRedeemTx = async (
  wh: Wormhole<Network> | undefined,
  req: IReqRedeemTx,
): Promise<IResTransferTx> => {
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

      const isTransferCompleted = await rcvTb.isTransferCompleted(vaa); // TODO: not working
      if (isTransferCompleted) {
        return {
          error: 'These tokens have already been redeemed.',
          unsignedTx: '',
        };
      }

      const redeem = rcvTb.redeem(getUniversalAddress(req.receiver), vaa!);
      const unsignedTx = await serializeTx(
        req.receiver.chain,
        req.receiver.address,
        wh,
        redeem,
      );
      return {
        unsignedTx,
      };
    }
    throw new Error(
      `buildRedeemTx : Source and Target chains must be different.`,
    );
  } catch (error) {
    throw new Error(`buildRedeemTx : ${error}`);
  }
};
