import { getNativeDecimals } from './getNativeDecimals';

import type { IReqTokenInfo, IResTokenInfo } from '../types';
import type { Network, Wormhole } from '@wormhole-foundation/sdk-connect';

export const getTokenInfo = (
  wh: Wormhole<Network> | undefined,
  req: IReqTokenInfo,
): IResTokenInfo => {
  if (req.token) {
    // TODO
    throw new Error();
  } else {
    const decimals = getNativeDecimals(req.chain);
    return {
      symbol: 'native',
      decimals,
    };
  }
};
