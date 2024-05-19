import type {
  Chain,
  ChainConfigOverrides,
  Network,
  Platform,
  PlatformToChains,
} from '@wormhole-foundation/sdk-connect';
import type {
  ChainContext,
  NativeAddressCtr,
  PlatformUtils,
} from '@wormhole-foundation/sdk-definitions';

type PROTCOLS =
  | 'WormholeCore'
  | 'TokenBridge'
  | 'PorticoBridge'
  | 'CircleBridge';

export interface IReqBalance {
  chain: Chain;
  address: string;
  token?: string;
}

export interface IResBalance {
  fValue?: number;
  value: string;
}

export interface IReqTokenInfo {
  chain: Chain;
  token?: string;
}

export interface IUniversalAccount {
  chain: Chain;
  address: string;
}

export interface IReqTransferTx {
  sender: IUniversalAccount;
  receiver: IUniversalAccount;
  token?: string;
  amount: string;
}

export interface IReqRedeemTx {
  source: Chain;
  txHash: string;
  receiver: IUniversalAccount;
}

export interface IResRedeemTx {
  error?: string;
  unsignedTx: any | undefined;
}

export interface IPlatformDefinition<P extends Platform> {
  Platform: PlatformUtils<P>;
  Address: NativeAddressCtr;
  protocols: {
    [key in PROTCOLS]?: () => Promise<any>;
  };
  getChain: <N extends Network, C extends PlatformToChains<P>>(
    network: N,
    chain: C,
    overrides?: ChainConfigOverrides<N, C>,
  ) => ChainContext<N, C, P>;
}
