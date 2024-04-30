import type {
  Chain,
  NativeAddressCtr,
  Network,
  Platform,
  PlatformContext,
  PlatformUtils,
} from '@wormhole-foundation/sdk-connect';

export type IVm =
  | 'Solana'
  | 'Algorand'
  | 'Near'
  | 'Sui'
  | 'Aptos'
  | 'Btc'
  | 'Evm'
  | 'Cosmwasm';

export type IWhPlatform = PlatformContext<Network, IVm>;

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

export interface PlatformDefinition<P extends Platform> {
  Platform: PlatformUtils<P>;
  Address: NativeAddressCtr;
  protocolLoaders: {
    [key: string]: () => Promise<any>;
  };
}
