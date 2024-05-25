import {
  getNative,
  getTokenByAddress,
} from '@wormhole-foundation/sdk-connect/tokens';

import type { IReqTokenInfo } from '../types';
import type { Network, Wormhole } from '@wormhole-foundation/sdk-connect';

export const getSymbol = (
  wh: Wormhole<Network> | undefined,
  req: IReqTokenInfo,
): string => {
  if (wh) {
    const temp = req.token
      ? getTokenByAddress(wh.network, req.chain, req.token)
      : getNative(wh.network, req.chain);
    if (temp) {
      return temp.symbol;
    }
    throw new Error(`getSymbol : ${req.token} is unknown token`);
  }
  throw new Error(`getSymbol : ${req.token}`);
};
