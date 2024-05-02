import type { IReqTokenInfo } from '../types';
import type { Network, Wormhole } from '@wormhole-foundation/sdk-connect';

export const getSymbol = (
  wh: Wormhole<Network> | undefined,
  req: IReqTokenInfo,
): string => {
  if (req.token) {
    // TODO
    throw new Error();
  } else {
    return 'native';
  }
};
