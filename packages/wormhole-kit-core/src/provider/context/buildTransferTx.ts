import { amount } from '@wormhole-foundation/sdk-base';

import { getDecimals } from './getDecimals';
import { getUniversalAddress } from './getUniversalAddress';
import { serializeTx } from './serializeTx';

import type { IReqTransferTx } from '../types';
import type { Chain, Network } from '@wormhole-foundation/sdk-base';
import type {
  UnsignedTransaction,
  Wormhole,
} from '@wormhole-foundation/sdk-connect';

export const buildTransferTx = async (
  wh: Wormhole<Network> | undefined,
  req: IReqTransferTx,
): Promise<UnsignedTransaction<Network, Chain>> => {
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
      return serializeTx(txs);
    }
    throw new Error(
      `buildTransferTx : Source and Target chains must be different.`,
    );
  } catch (error) {
    throw new Error(`buildTransferTx : ${error}`);
  }
};
