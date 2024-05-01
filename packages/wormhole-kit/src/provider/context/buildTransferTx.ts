import { amount } from '@wormhole-foundation/sdk-base';

import { getNativeDecimals } from './getNativeDecimals';
import { getUniversalAddress } from './getUniversalAddress';
import { serializeTx } from './serializeTx';

import type { IReqTransferTx } from '../types';
import type { Network } from '@wormhole-foundation/sdk-base';
import type { Wormhole } from '@wormhole-foundation/sdk-connect';

export const buildTransferTx = async (
  wh: Wormhole<Network> | undefined,
  req: IReqTransferTx,
): Promise<string> => {
  try {
    if (wh && req.sender.chain !== req.receiver.chain) {
      const snd = wh.getChain(req.sender.chain);
      const sndTb = await snd.getTokenBridge();
      const txs = sndTb.transfer(
        getUniversalAddress(req.sender),
        {
          chain: req.receiver.chain,
          address: getUniversalAddress(req.receiver),
        },
        req.token.info ? (req.token.info.type as any) : 'native',
        amount.units(
          req.token.info
            ? amount.parse(req.token.amount, req.token.info.decimals)
            : amount.parse(
                req.token.amount,
                getNativeDecimals(req.sender.chain),
              ),
        ),
      );
      return serializeTx(req.sender.chain, req.sender.address, txs);
    }
    throw new Error(
      `buildTransferTx : Source and Target chains must be different.`,
    );
  } catch (error) {
    throw new Error(`buildTransferTx : ${error}`);
  }
};
