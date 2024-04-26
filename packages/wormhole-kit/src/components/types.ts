import type { Chain } from '@wormhole-foundation/sdk/dist/cjs';

export interface IReqRedeemTx {
  source: Chain;
  txHash: string;
  receiver: IUniversalAccount;
}

export interface IUniversalAccount {
  chain: Chain;
  address: string;
}

export interface IReqTransferTx {
  sender: IUniversalAccount;
  receiver: IUniversalAccount;
  token: {
    info?: {
      type: string;
      decimals: number;
    };
    amount: string;
  };
}
