import type { IReqBalance, IResBalance } from '../types';
import type { Network, Wormhole } from '@wormhole-foundation/sdk-connect';

export const getBalance = async (
  wh: Wormhole<Network> | undefined,
  req: IReqBalance,
): Promise<IResBalance> => {
  if (wh) {
    const balance = await wh.getBalance(
      req.chain,
      req.token as any, // TODO
      req.address,
    );
    return {
      value: balance ? balance.toString() : '0',
    };
  }
  throw new Error();
};
