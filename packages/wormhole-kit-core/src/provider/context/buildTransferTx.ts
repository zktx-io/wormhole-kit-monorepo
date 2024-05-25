import { amount } from '@wormhole-foundation/sdk-connect';

import { getDecimals } from './getDecimals';
import { getUniversalAddress } from './getUniversalAddress';
import { serializeTx } from './serializeTx';

import type { IReqTransferTx, IResTransaction } from '../types';
import type { Network, Wormhole } from '@wormhole-foundation/sdk-connect';

export const buildTransferTx = async (
  wh: Wormhole<Network> | undefined,
  req: IReqTransferTx,
): Promise<IResTransaction> => {
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
        req.token ? (req.token as any) : 'native', // TODO
        amount.units(
          amount.parse(
            req.amount,
            getDecimals(req.sender.chain, wh.network, req.token),
          ),
        ),
      );
      const unsignedTxs = await serializeTx(req.sender.chain, txs);
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
