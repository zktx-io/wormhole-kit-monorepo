// import type { Chain } from '@wormhole-foundation/sdk/dist/cjs';

export type Network = 'Mainnet' | 'Testnet';
export type Chain = "Aptos" | 'Sui';

export interface IReqRedeemTx {
  source: string; //Chain;
  txHash: string;
  receiver: IUniversalAccount;
}

export interface IUniversalAccount {
  chain: string; // Chain;
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
