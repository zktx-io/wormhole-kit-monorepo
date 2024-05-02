import { getTokenInfo } from '../tokens';

import type { IReqTokenInfo } from '../types';
import type { Network, Wormhole } from '@wormhole-foundation/sdk-connect';

export const getSymbol = (
  wh: Wormhole<Network> | undefined,
  req: IReqTokenInfo,
): string => {
  if (req.token) {
    if (wh) {
      return getTokenInfo(req.chain, wh.network, req.token).symbol; // TEMP
    }
    throw new Error(`getSymbol : ${req.token}`);
  } else {
    return 'native';
  }
};
