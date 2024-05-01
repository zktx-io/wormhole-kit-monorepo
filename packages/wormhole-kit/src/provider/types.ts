import type { Chain, Network, Platform } from '@wormhole-foundation/sdk-base';
import type {
  NativeAddressCtr,
  PlatformContext,
  PlatformUtils,
} from '@wormhole-foundation/sdk-definitions';

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

export interface IPlatformDefinition<P extends Platform> {
  Platform: PlatformUtils<P>;
  Address: NativeAddressCtr;
  protocolLoaders: {
    [key: string]: () => Promise<any>;
  };
}

export interface TokenInfo {
  symbol: string;
  decimals: number;
}
