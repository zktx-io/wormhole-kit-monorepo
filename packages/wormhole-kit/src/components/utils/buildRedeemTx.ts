import { api, applyOverrides } from '@wormhole-foundation/sdk-connect';

import { getTokenBridge } from './getTokenBridge';
import { getUniversalAddress } from './getUniversalAddress';
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
    const source = platforms[req.source];
    const wc = await source.getProtocol('WormholeCore', source.getRpc);
    const [whm] = await wc.parseTransaction(req.txHash);
    const vaa = (await getVaa(
      network,
      whm!,
      'TokenBridge:Transfer',
      60_000,
    )) as VAA<'TokenBridge:Transfer'>;
    const rcv = platforms[req.receiver.chain];
    const rcvTb = await getTokenBridge(req.receiver.chain, rcv);
    const redeem = rcvTb.redeem(getUniversalAddress(req.receiver), vaa!);
    return serializeTx(req.receiver.chain, req.receiver.address, redeem);
  } catch (error) {
    throw new Error(`buildRedeemTx : ${error}`);
  }
};
