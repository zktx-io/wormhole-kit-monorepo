import { amount } from '@wormhole-foundation/sdk-base';

import { getNativeDecimals } from './getNativeDecimals';
import { getTokenBridge } from './getTokenBridge';
import { getUniversalAddress } from './getUniversalAddress';
import { serializeTx } from './serializeTx';

import type { IReqTransferTx, IWhPlatform } from '../types';

export const buildTransferTx = async (
  platforms: { [key: string]: IWhPlatform },
  req: IReqTransferTx,
): Promise<string> => {
  try {
    if (req.sender.chain !== req.receiver.chain) {
      const sndTb = await getTokenBridge(req.sender.chain, platforms);
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
