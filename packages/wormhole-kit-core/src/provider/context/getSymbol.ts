import { getTokenByAddress } from '@wormhole-foundation/sdk-connect/tokens';

import type { IReqTokenInfo } from '../types';
import type { Network, Wormhole } from '@wormhole-foundation/sdk-connect';

export const getSymbol = (
  wh: Wormhole<Network> | undefined,
  req: IReqTokenInfo,
): string => {
  if (req.token) {
    if (wh) {
      const temp = getTokenByAddress(wh.network, req.chain, req.token);
      if (temp) {
        return temp.symbol;
      }
      throw new Error(`getSymbol : ${req.token} is unknown token`);
    }
    throw new Error(`getSymbol : ${req.token}`);
  } else {
    return 'native';
  }
};
