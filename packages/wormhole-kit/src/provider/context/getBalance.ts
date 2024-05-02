import {
  amount,
  type Network,
  type Wormhole,
} from '@wormhole-foundation/sdk-connect';

import { getNativeDecimals } from './getNativeDecimals';

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

    if (req.token) {
      // TODO
      return {
        value: balance ? balance.toString() : '0',
      };
    }

    return {
      fValue: balance
        ? Number(amount.fmt(balance, getNativeDecimals(req.chain)))
        : 0,
      value: balance ? balance.toString() : '0',
    };
  }
  throw new Error();
};
