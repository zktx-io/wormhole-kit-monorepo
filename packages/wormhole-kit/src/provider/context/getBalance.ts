import {
  amount,
  type Network,
  type Wormhole,
} from '@wormhole-foundation/sdk-connect';

import { getDecimals } from './getDecimals';

import type { IReqBalance, IResBalance } from '../types';

export const getBalance = async (
  wh: Wormhole<Network> | undefined,
  req: IReqBalance,
): Promise<IResBalance> => {
  if (wh) {
    const balance = await wh.getBalance(
      req.chain,
      req.token ? (req.token as any) : 'native', // TODO
      req.address,
    );
    return {
      fValue: balance
        ? Number(amount.fmt(balance, getDecimals(req.chain, req.token)))
        : 0,
      value: balance ? balance.toString() : '0',
    };
  }
  throw new Error();
};
