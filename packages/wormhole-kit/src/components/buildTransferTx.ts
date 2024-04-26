import { amount, type Wormhole } from '@wormhole-foundation/sdk';

import { serializeTx } from './serializeTx';
import { getUniversalAddress } from './utils/getUniversalAddress';

import type { IReqTransferTx } from './types';

export const buildTransferTx = async (
  wh: Wormhole<'Mainnet' | 'Testnet' | 'Devnet'>,
  req: IReqTransferTx,
): Promise<string> => {
  try {
    const ctx = wh.getChain(req.sender.chain);
    const sndTb = await ctx.getTokenBridge();
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
          : amount.parse(req.token.amount, ctx.config.nativeTokenDecimals),
      ),
    );
    return serializeTx(req.sender.chain, req.sender.address, txs);
  } catch (error) {
    throw new Error(`${error}`);
  }
};
