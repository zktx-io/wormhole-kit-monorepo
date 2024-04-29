import type { AlgorandPlatform } from '@wormhole-foundation/sdk-algorand';
import type { AptosPlatform } from '@wormhole-foundation/sdk-aptos';
import type { Chain, Network } from '@wormhole-foundation/sdk-connect';
import type { EvmPlatform } from '@wormhole-foundation/sdk-evm';
import type { SolanaPlatform } from '@wormhole-foundation/sdk-solana';
import type { SuiPlatform } from '@wormhole-foundation/sdk-sui';

export type IWhPlatform =
  | AlgorandPlatform<Network>
  | AptosPlatform<Network>
  | EvmPlatform<Network>
  | SolanaPlatform<Network>
  | SuiPlatform<Network>;

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
