import type { AlgorandPlatform } from '@wormhole-foundation/sdk-algorand';
import type { AptosPlatform } from '@wormhole-foundation/sdk-aptos';
import type { EvmPlatform } from '@wormhole-foundation/sdk-evm';
import type { SolanaPlatform } from '@wormhole-foundation/sdk-solana';
import type { SuiPlatform } from '@wormhole-foundation/sdk-sui';

export type IWhNetwork = 'Mainnet' | 'Testnet';
export type IWhChain =
  | 'Algorand'
  | 'Aptos'
  | 'Solana'
  | 'Sui'
  | 'Celo'
  | 'Ethereum'
  | 'Klaytn';
export type IWhPlatform =
  | AlgorandPlatform<'Mainnet' | 'Testnet' | 'Devnet'>
  | AptosPlatform<'Mainnet' | 'Testnet' | 'Devnet'>
  | EvmPlatform<'Mainnet' | 'Testnet' | 'Devnet'>
  | SolanaPlatform<'Mainnet' | 'Testnet' | 'Devnet'>
  | SuiPlatform<'Mainnet' | 'Testnet' | 'Devnet'>;

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
