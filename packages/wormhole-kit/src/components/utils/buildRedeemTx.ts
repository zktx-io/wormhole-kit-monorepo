import { api, applyOverrides } from '@wormhole-foundation/sdk-connect';

import { getUniversalAddress } from './getUniversalAddress';
import { getTokenBridge } from './protocols/getTokenBridge';
import { getWormholeCore } from './protocols/getWormholeCore';
import { serializeTx } from './serializeTx';

import type { IReqRedeemTx, IWhPlatform } from '../types';
import type {
  Network,
  PayloadDiscriminator,
  PayloadLiteral,
  VAA,
} from '@wormhole-foundation/sdk-connect';

const getVaa = async (
  network: Network,
  id: any,
  decodeAs: PayloadLiteral | PayloadDiscriminator,
  timeout: number,
) => {
  const config = applyOverrides(network);
  if (typeof id === 'string') {
    return await api.getVaaByTxHashWithRetry(config.api, id, decodeAs, timeout);
  }
  return await api.getVaaWithRetry(config.api, id, decodeAs, timeout);
};

export const buildRedeemTx = async (
  network: Network,
  platforms: { [key: string]: IWhPlatform },
  req: IReqRedeemTx,
): Promise<string> => {
  try {
    const wc = await getWormholeCore(req.source, platforms);
    const [whm] = await wc.parseTransaction(req.txHash);
    const vaa = (await getVaa(
      network,
      whm!,
      'TokenBridge:Transfer',
      60_000,
    )) as VAA<'TokenBridge:Transfer'>;
    const rcvTb = await getTokenBridge(req.receiver.chain, platforms);
    const redeem = rcvTb.redeem(getUniversalAddress(req.receiver), vaa!);
    return serializeTx(req.receiver.chain, req.receiver.address, redeem);
  } catch (error) {
    throw new Error(`buildRedeemTx : ${error}`);
  }
};
