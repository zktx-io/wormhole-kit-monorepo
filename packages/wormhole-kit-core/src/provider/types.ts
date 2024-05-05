import type {
  Chain,
  Network,
  Platform,
  PlatformToChains,
} from '@wormhole-foundation/sdk-connect';
import type {
  ChainContext,
  NativeAddressCtr,
  PlatformUtils,
  UnsignedTransaction,
} from '@wormhole-foundation/sdk-definitions';

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

export interface IResTransferTx {
  error?: string;
  unsignedTx: UnsignedTransaction<Network, Chain> | undefined;
}

export interface IReqRedeemTx {
  source: Chain;
  txHash: string;
  receiver: IUniversalAccount;
}

export interface IPlatformDefinition<P extends Platform> {
  Platform: PlatformUtils<P>;
  Address: NativeAddressCtr;
  protocolLoaders: {
    [key: string]: () => Promise<any>;
  };
  getChain: <N extends Network, C extends PlatformToChains<P>>(
    network: N,
    chain: C,
  ) => ChainContext<N, C, P>;
}
