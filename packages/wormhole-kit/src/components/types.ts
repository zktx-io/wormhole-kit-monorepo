import type { Chain } from '@wormhole-foundation/sdk/dist/cjs';

export interface IReqRedeemTx {
  chain: Chain;
  hash: string;
}

export interface IReqTransferTx {
  sender: string;
  receiver: { chain: Chain; address: string };
}
