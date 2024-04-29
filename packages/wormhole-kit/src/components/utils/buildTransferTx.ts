import { amount } from '@wormhole-foundation/sdk-connect';

import { getNativeDecimals } from './getNativeDecimals';
import { getUniversalAddress } from './getUniversalAddress';
import { getTokenBridge } from './protocols/getTokenBridge';
import { serializeTx } from './serializeTx';

import type { IReqTransferTx, IWhPlatform } from '../types';

export const buildTransferTx = async (
  platforms: { [key: string]: IWhPlatform },
  req: IReqTransferTx,
): Promise<string> => {
  try {
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
          : amount.parse(req.token.amount, getNativeDecimals(req.sender.chain)),
      ),
    );
    return serializeTx(req.sender.chain, req.sender.address, txs);
  } catch (error) {
    throw new Error(`buildTransferTx : ${error}`);
  }
};
